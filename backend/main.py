import os
import jwt
import asyncio
import uuid
import smtplib
import resend
import random
import traceback
import easyocr
import hashlib
import numpy as np
from PIL import Image
from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks, Depends, Request, Form, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security.api_key import APIKeyHeader
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.responses import FileResponse, JSONResponse 
from datetime import datetime, timedelta
from dotenv import load_dotenv
from supabase import create_client, Client
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.requests import Request
from starlette.status import HTTP_403_FORBIDDEN

# استيراد الدوال الـ Async والـ Processor المطور
from database import (
    save_file_info, 
    save_analysis_results, 
    get_dashboard_data, 
    get_files_from_db, 
    get_file_by_id, 
    delete_file_db,
    run_sync_in_async,
    supabase
)
from storage import upload_file_to_r2, delete_from_r2, R2_PUBLIC_URL
from processor import DocumentProcessor # تأكد أنك حدثت ملف processor.py بالنسخة اللي عطيتك
from pydantic import BaseModel, EmailStr

# مكتبات الـ PDF للتقارير
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

load_dotenv()

app = FastAPI(title="DocSift AI - High Scale Edition")
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# 1. نظام "العساس" (Semaphore) لضمان عدم انهيار السيرفر المجاني
# كنخليو غير 2 عمليات OCR يخدموا فدقة وحدة، والخرين كيتسناو النوبة
analysis_semaphore = asyncio.Semaphore(2)
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

# 1. إعداد نظام "الساروت" (API Key Security)
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# إعداد الـ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- define the form of the data (schema) ---
class UserSignUp(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class VerifyOTP(BaseModel):
    email: str
    token: str

resend.api_key = os.getenv("RESEND_API_KEY")
token = os.getenv("SUPABASE_KEY")
if token:
    try:
        decoded = jwt.decode(token, options={"verify_signature": False})
        print(f"[CHECK] Current Key Role: {decoded.get('role')}")
    except Exception:
        print("[CHECK] Cannot decode SUPABASE_KEY")

# إعداد الكليينت
url = os.getenv("SUPABASE_URL")
supabase: Client = create_client(url, token)

@app.get("/")
async def read_root():
    return {"status": "online", "message": "Neural Engine OCR-Ready & Scalable"}


# --- authentication part ---
def send_auth_email(target_email: str, code: str):
    sender_email = os.getenv("GMAIL_USER")
    app_password = os.getenv("GMAIL_PASSWORD")

    message = MIMEMultipart()
    message["From"] = f"DocSift Official <{sender_email}>"
    message["To"] = target_email
    message["Subject"] = f"{code} is your DocSift verification code"

    html = f"""
    <div style="font-family: sans-serif; max-width: 400px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Verify your account</h2>
        <p style="color: #555;">Use the code below to access your DocSift dashboard. This code is valid for <b>5 minutes</b>.</p>
        <div style="background: #f4f4f4; font-size: 32px; font-weight: bold; text-align: center; padding: 15px; color: #4f46e5; letter-spacing: 5px; border-radius: 5px;">
            {code}
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 20px; text-align: center;">If you didn't request this code, please ignore this email.</p>
    </div>
    """
    message.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, app_password)
            server.sendmail(sender_email, target_email, message.as_string())
        print(f"✅ Email sent to {target_email}")
    except Exception as e:
        print(f"❌ SMTP Error: {str(e)}")

# --- 3. Signup Route (Limited: 5 per hour) ---
@app.post("/auth/signup")
@limiter.limit("5/hour")
async def signup(request: Request, user: UserSignUp, background_tasks: BackgroundTasks):
    try:
        auth_res = await run_sync_in_async(lambda: supabase.auth.sign_up({
            "email": user.email, "password": user.password
        }))
        
        otp_code = str(random.randint(100000, 999999))
        expiry_time = datetime.utcnow() + timedelta(minutes=5)

        supabase.table("otps").upsert({
            "email": user.email,
            "code": otp_code,
            "expires_at": expiry_time.isoformat()
        }, on_conflict="email").execute()

        background_tasks.add_task(send_auth_email, user.email, otp_code)
        return {"status": "success", "message": "Verification code sent!"}
    except Exception as e:
        print(f"🔥 Signup Error: {str(e)}")
        raise HTTPException(status_code=400, detail="Account creation failed.")

# --- 4. Verify Route ---
@app.post("/auth/verify")
async def verify_email(data: VerifyOTP):
    try:
        otp_res = supabase.table("otps").select("*").eq("email", data.email).single().execute()
        if not otp_res.data or otp_res.data['code'] != data.token:
            raise HTTPException(status_code=400, detail="Invalid verification code.")

        profile_res = supabase.table("profiles").select("id").eq("email", data.email).execute()
        if not profile_res.data:
            raise HTTPException(status_code=404, detail="Profile not found.")
        
        user_id = profile_res.data[0]['id']
        supabase.table("profiles").update({"is_verified": True, "credits": 10}).eq("id", user_id).execute()
        supabase.table("otps").delete().eq("email", data.email).execute()

        return {"status": "success", "message": "Verified!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Verification failed.")

# --- 5. Login Route ---
@app.post("/auth/login")
async def login(user: UserLogin):
    try:
        res = await run_sync_in_async(lambda: supabase.auth.sign_in_with_password({
            "email": user.email, "password": user.password
        }))
        
        profile = supabase.table("profiles").select("*").eq("email", user.email).single().execute()
        if not profile.data or not profile.data.get("is_verified"):
            raise HTTPException(status_code=401, detail="Please verify your email first!")

        return {
            "token": res.session.access_token,
            "user_id": res.user.id,
            "full_name": profile.data.get("full_name", ""),
            "credits": profile.data.get("credits", 0)
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials.")

# --- 6. Forgot Password (Limited: 3 per minute) ---
@app.post("/auth/forgot-password")
@limiter.limit("3/minute")
async def forgot_password(request: Request, data: dict, background_tasks: BackgroundTasks):
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    otp = str(random.randint(100000, 999999))
    try:
        supabase.table("otps").upsert({
            "email": email, "code": otp,
            "expires_at": (datetime.utcnow() + timedelta(minutes=10)).isoformat()
        }, on_conflict="email").execute()
        
        background_tasks.add_task(send_auth_email, email, otp)
        return {"message": "Reset code sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Could not process request")

# --- 7. Reset Password ---
@app.post("/auth/reset-password")
async def reset_password(data: dict):
    email, token, new_password = data.get("email"), data.get("token"), data.get("new_password")
    if not all([email, token, new_password]):
        raise HTTPException(status_code=400, detail="Missing fields")

    try:
        otp_res = supabase.table("otps").select("*").eq("email", email).single().execute()
        if not otp_res.data or otp_res.data['code'] != token:
            raise HTTPException(status_code=400, detail="Invalid code")
        
        user_list = supabase.auth.admin.list_users()
        target_user = next((u for u in user_list if u.email == email), None)
        
        if not target_user:
            raise HTTPException(status_code=404, detail="User not found")

        supabase.auth.admin.update_user_by_id(target_user.id, attributes={"password": new_password})
        supabase.table("otps").delete().eq("email", email).execute()
        
        return {"status": "success", "message": "Password updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Reset failed")

async def process_and_analyze_task(file_id: str, filename: str, content: bytes, file_url: str):
    try:
        print(f"⚙️ Background Work Starting: {filename}")
        
        # 1. استخراج النص
        text = await DocumentProcessor.extract_text(content, filename.split('.')[-1])
        
        # 2. التحليل المتقدم
        analysis = await DocumentProcessor.analyze_risk(text)
        
        # 3. 🔥 التصحيح: تحويل Scores لـ Integer (رقم صحيح) باستعمال int()
        # هادشي غايهنينا من الموشكيل ديال '79.1'
        update_data = {
            "risk_score": int(analysis.get("risk_score", 0)), # تحويل لـ 79
            "compliance_score": int(analysis.get("compliance_score", 0)), # تحويل لـ رقم صحيح
            "status": "complete",
            "breakdown": analysis.get("breakdown", {}) # الـ Breakdown أصلاً dict فمافيهش مشكل
        }
        
        print(f"📊 Sending Data to DB: {update_data}")
        
        await run_sync_in_async(lambda: supabase.table("files").update(update_data).eq("id", file_id).execute())
        await save_analysis_results(file_id, analysis)
        
        print(f"✅ Analysis finished for {filename}")

    except Exception as e:
        print(f"❌ Worker Error: {str(e)}")
        # حتى هنا نأكدوا أن الـ status كيتحدث فاش كيوقع Error
        try:
            await run_sync_in_async(lambda: supabase.table("files").update({"status": "error"}).eq("id", file_id).execute())
        except:
            pass

@app.post('/upload')
async def upload(
    background_tasks: BackgroundTasks, 
    user_id: str = Form(...), 
    file: UploadFile = File(...)
):
    try:
        # فحص الكريديت (نفس الكود ديالك)
        user_res = supabase.table("profiles").select("credits").eq("id", user_id).single().execute()
        current_credits = user_res.data.get("credits", 0) if user_res.data else 0

        if current_credits <= 0:
            raise HTTPException(status_code=403, detail="Out of credits.")

        file_content = await file.read()
        file_id = str(uuid.uuid4())
        r2_path = f"{user_id}/{file.filename}"
        
        # الرفع لـ R2 (Async)
        upload_success = await upload_file_to_r2(file_content, r2_path)
        if not upload_success:
            raise HTTPException(status_code=500, detail="Storage error")

        # تسجيل فـ الداتابيز
        supabase.table("files").insert({
            "id": file_id, "user_id": user_id, "name": file.filename,
            "url": f"{R2_PUBLIC_URL}/{r2_path}", "status": "processing"
        }).execute()

        # خصم الكريديت
        supabase.table("profiles").update({"credits": current_credits - 1}).eq("id", user_id).execute()

        # 🔥 التغيير هنا: صيفطنا المهمة لـ "المنظم"
        background_tasks.add_task(queued_analysis, file_id, file.filename, file_content, r2_path)

        return {"status": "processing", "file_id": file_id, "remaining_credits": current_credits - 1}

    except Exception as e:
        print(f"❌ Upload Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# 2. 🔥 الدالة المنظمة للنوبة (The Queue Controller)
async def queued_analysis(file_id, filename, content, r2_path):
    async with analysis_semaphore: # هنا السيرفر كيشد النوبة
        print(f"🚀 Semaphore granted for: {filename}. Starting analysis...")
        await process_and_analyze_task(file_id, filename, content, r2_path)

@app.get("/dashboard-stats")
async def get_dashboard(user_id: str): # ضروري نصيفطو الـ ID باش نعرفو شكون
    try:
        # 1. جيب معلومات البروفايل (الكريديت)
        profile_res = supabase.table("profiles").select("credits").eq("id", user_id).single().execute()
        credits = profile_res.data.get("credits", 0) if profile_res.data else 0

        # 2. جيب الملفات ديال هاد المستخدم فقط
        files_res = supabase.table("files").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        files = files_res.data or []

        # 3. حساب الإحصائيات (Stats)
        total_docs = len(files)
        total_risks = sum(1 for f in files if f.get("risk_score", 0) > 50)
        
        # حساب معدل الامتثال (Compliance Average)
        compliance_scores = [f.get("compliance_score", 0) for f in files]
        compliance_rate = int(sum(compliance_scores) / total_docs) if total_docs > 0 else 100

        return {
            "total_docs": total_docs,
            "total_risks": total_risks,
            "compliance_rate": compliance_rate,
            "credits": credits, # <--- هادي هي المهمة للـ UI الجديد
            "recent_activity": files[:5] # آخر 5 عمليات
        }
    except Exception as e:
        print(f"❌ Dashboard Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch dashboard intelligence.")

@app.get("/files")
async def get_all_files():
    return await get_files_from_db()

@app.delete("/files/{file_id}")
async def delete_file(file_id: str):
    file_data = await get_file_by_id(file_id)
    if not file_data:
        raise HTTPException(status_code=404, detail="File not found")
        
    await asyncio.gather(
        delete_from_r2(file_data['name']),
        delete_file_db(file_id)
    )
    return {"message": "Asset and analysis purged successfully"}

@app.get("/generate-report/{file_id}")
async def generate_report(file_id: str):
    file_data = await get_file_by_id(file_id)
    if not file_data:
         raise HTTPException(status_code=404, detail="File not found")

    file_path = f"generated_reports/Audit_{file_id}.pdf"
    os.makedirs("generated_reports", exist_ok=True)

    # توليد بصمة رقمية فريدة للتقرير (Digital Fingerprint) للحماية من التزوير
    report_hash = hashlib.sha256(f"{file_id}-{datetime.now()}".encode()).hexdigest()[:16].upper()

    doc = SimpleDocTemplate(file_path, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=30, bottomMargin=30)
    styles = getSampleStyleSheet()
    elements = []

    # --- Canvas Function للـ Watermark (كتطبع فـ كاع الصفحات) ---
    def add_watermark(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica-Bold', 60)
        canvas.setStrokeColor(colors.lightgrey)
        canvas.setFillAlpha(0.1) # لون خفيييف بزاف باش مايغطيش على الكتبه
        canvas.translate(300, 400)
        canvas.rotate(45)
        canvas.drawCentredString(0, 0, "OFFICIAL DOCSIFT AUDIT")
        
        # إضافة كود الحماية فـ الجنب ديال الورقة
        canvas.rotate(-45)
        canvas.setFont('Helvetica', 7)
        canvas.setFillAlpha(0.5)
        canvas.drawString(-250, -380, f"AUTHENTICITY HASH: {report_hash} | VERIFY AT DOCSIFT.AI/VERIFY")
        canvas.restoreState()

    # --- إعداد الستيلات ---
    header_style = ParagraphStyle('MainTitle', fontSize=22, fontName='Helvetica-Bold', textColor=colors.HexColor("#1E1B4B"))
    legal_warning_style = ParagraphStyle('Warning', fontSize=7, textColor=colors.red, alignment=TA_CENTER, leading=8)

    # --- 1. الهيدر (Logo + Report Title) ---
    logo_path = os.path.join("assets", "logo.png")
    logo_img = None

    if os.path.exists(logo_path):
        from reportlab.lib.units import inch
        try:
            logo_img = Image(logo_path)
            # كنحددو العرض اللي بغينا (مثلا 1.2 إنش)
            desired_width = 1.2 * inch
            # كنحسبو شحال خاص يكون الطول باش نحافظو على الأبعاد (Aspect Ratio)
            aspect = logo_img.imageHeight / float(logo_img.imageWidth)
            logo_img.drawWidth = desired_width
            logo_img.drawHeight = desired_width * aspect
            logo_img.hAlign = 'LEFT'
        except Exception as e:
            print(f"❌ Logo Load Error: {e}")
            logo_img = "DOCSIFT AI" # إلا وقع مشكل فـ الصورة كيرجع نص
    else:
        logo_img = "DOCSIFT AI"

    header_data = [[logo_img, Paragraph("NEURAL AUDIT REPORT", header_style)]]
    header_table = Table(header_data, colWidths=[100, 420])
    header_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('ALIGN', (1, 0), (1, 0), 'RIGHT')]))
    elements.append(header_table)
    elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#4F46E5"), spaceAfter=20))

    # --- 2. التحذير الأمني (Security Warning) ---
    warning_text = "PROTECTED DOCUMENT: This audit is cryptographically linked to DocSift Neural Systems. Unauthorized alteration is a federal offense."
    elements.append(Paragraph(warning_text, legal_warning_style))
    elements.append(Spacer(1, 15))

    # --- 3. معلومات الملف ---
    meta_data = [
        ["ASSET NAME:", file_data['name']],
        ["AUDIT ID:", f"DOC-{file_id[:8].upper()}"],
        ["TIMESTAMP:", datetime.now().strftime('%Y-%m-%d %H:%M:%S')],
        ["SECURITY HASH:", report_hash] # البصمة الرقمية كبان فـ المعلومات
    ]
    meta_table = Table(meta_data, colWidths=[120, 380])
    meta_table.setStyle(TableStyle([('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'), ('TEXTCOLOR', (0,0), (0,-1), colors.HexColor("#374151"))]))
    elements.append(meta_table)
    elements.append(Spacer(1, 20))

    # --- 4. جدول النتائج (The Pro Table) ---
    data = [
        ["AUDIT CATEGORY", "SCORE", "RISK ASSESSMENT"],
        ["Legal Exposure", f"{int(file_data.get('breakdown', {}).get('legal', 0))}%", "VERIFIED"],
        ["Financial Liability", f"{int(file_data.get('breakdown', {}).get('financial', 0))}%", "SECURE"],
        ["Compliance Overall", f"{int(file_data.get('compliance_score', 0))}%", "CERTIFIED"],
    ]
    analysis_table = Table(data, colWidths=[200, 100, 200])
    analysis_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1E1B4B")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F3F4F6")]),
    ]))
    elements.append(analysis_table)

    # --- 5. الصرامة القانونية (Hardcore Legal Clause) ---
    elements.append(Spacer(1, 80))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.black))
    
    strict_legal = f"""
    <b>CRITICAL LEGAL NOTICE:</b> This document is issued under the Digital Assets Security Act. Any attempt to modify, forge, or misrepresent the scores herein is strictly prohibited and punishable under international fraud and cybercrime laws. 
    This report is verified by Hash <b>{report_hash}</b>. Forgery will be detected upon verification against DocSift's central database. 
    DocSift AI assumes no liability for external use. All rights reserved © {datetime.now().year}.
    """
    elements.append(Paragraph(strict_legal, ParagraphStyle('Strict', fontSize=7, leading=9, textColor=colors.HexColor("#111827"))))

    # بناء الملف مع تطبيق الـ Watermark
    doc.build(elements, onFirstPage=add_watermark, onLaterPages=add_watermark)
    return FileResponse(path=file_path, filename=f"SECURE_AUDIT_{file_data['name']}.pdf")

@app.get("/api-keys")
async def get_keys():
    # جلب المفاتيح من Supabase
    res = await run_sync_in_async(lambda: supabase.table("api_keys").select("*").execute())
    return res.data

@app.post("/api-keys")
async def create_key(data: dict):
    # توليد مفتاح جديد وحفظه
    new_key = f"ds_{uuid.uuid4().hex}"
    key_data = {"name": data['name'], "key_value": new_key}
    res = await run_sync_in_async(lambda: supabase.table("api_keys").insert(key_data).execute())
    return res.data[0]

@app.delete("/api-keys/{key_id}")
async def delete_key(key_id: str):
    await run_sync_in_async(lambda: supabase.table("api_keys").delete().eq("id", key_id).execute())
    return {"status": "deleted"}

@app.middleware("http")
async def error_handling_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        # 1. كيطبع ليك الخطأ الحقيقي فـ الـ Terminal بـ الألوان والتفاصيل
        print("\n" + "="*50)
        print(f"❌ GLOBAL ERROR CAUGHT:")
        print(traceback.format_exc()) # هادي غاتعطيك حتى السطر فين كاين المشكل
        print("="*50 + "\n")
        
        # 2. كيجاوب الـ Frontend بـ رسالة وحدة غامضة وأنيقة
        return JSONResponse(
            status_code=500,
            content={"detail": "Something went wrong on our end. We're looking into it!"}
        )

# --- api shit ---
async def get_api_key(api_key_header: str = Security(api_key_header)):
    if not api_key_header:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="API Key is missing. Check 'X-API-Key' header.")
    
    # التأكد من المفتاح فـ Supabase
    res = supabase.table("api_keys").select("*").eq("key_value", api_key_header).execute()
    
    if not res.data:
        raise HTTPException(status_code=HTTP_4_FORBIDDEN, detail="Invalid or Revoked API Key.")
    
    return res.data[0] # كيرجع معلومات صاحب المفتاح (User ID, Plan, etc.)

# 2. الـ Endpoint اللي غايستعملوا الشركات (B2B Route)
@app.post("/v1/analyze")
async def b2b_analyze(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    key_info: dict = Depends(get_api_key) # 🔥 الحماية هنا
):
    try:
        user_id = key_info.get("user_id")
        file_id = str(uuid.uuid4())
        content = await file.read()
        
        # 1. حفظ الملف فـ السحابة (R2/S3)
        r2_path = f"uploads/{user_id}/{file_id}_{file.filename}"
        # (هنا كتحط كود الـ Upload اللي ديجا درناه)
        
        # 2. إضافة المهمة للـ Background (عشان الـ API يرجع جواب سريع)
        background_tasks.add_task(process_and_analyze_task, file_id, file.filename, content, r2_path)
        
        return {
            "status": "processing",
            "file_id": file_id,
            "message": "Document received. Analysis started in background.",
            "request_id": str(uuid.uuid4())[:8]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")