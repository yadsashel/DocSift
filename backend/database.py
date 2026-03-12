import os 
import asyncio
import time
from dotenv import load_dotenv
from supabase import create_client, Client

# تحميل متغيرات البيئة
load_dotenv()

# إعداد الاتصال بـ Supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("❌ ERROR: SUPABASE_URL or SUPABASE_KEY missing in .env")

# إنشاء الكلاينت
supabase: Client = create_client(url, key)

async def run_sync_in_async(func, *args, max_retries=3):
    """دالة عالمية: كتحول أي عملية Sync لـ Async مع نظام إعادة المحاولة (Retry) ضد أخطاء SSL/EOF"""
    loop = asyncio.get_event_loop()
    for attempt in range(max_retries):
        try:
            # تنفيذ الدالة في الـ Thread Pool
            return await loop.run_in_executor(None, func, *args)
        except Exception as e:
            error_msg = str(e).upper()
            # التحقق من أخطاء الاتصال المشفر أو انقطاع الجلسة
            if "EOF" in error_msg or "SSL" in error_msg or "CONNECTION" in error_msg:
                if attempt < max_retries - 1:
                    wait = (attempt + 1) * 2 # زيادة وقت الانتظار تدريجياً
                    print(f"⚠️ Network Glitch Detected (SSL/EOF). Retrying in {wait}s... (Attempt {attempt + 1}/{max_retries})")
                    await asyncio.sleep(wait)
                    continue
            print(f"❌ DB EXECUTION ERROR: {e}")
            raise e

async def save_file_info(user_id: str, file_name: str, file_url: str, risk_score=0, compliance_score=0, breakdown=None):
    """حفظ معلومات الملف مع ربطها بالمستخدم (user_id) لضمان التحكم في الملايين من البيانات"""
    try:
        # دابا زدنا الـ user_id باش كل ملف يكون عندو "بصمة" ديال مولاه
        data = {
            "user_id": user_id,  # الساروت ديال الربط
            "name": file_name,  
            "url": file_url,  
            "risk_score": int(float(risk_score)), 
            "compliance_score": int(float(compliance_score)),
            "breakdown": breakdown,
        }
        
        # تنفيذ الإدخال فـ جدول الـ files (أو usage_logs حسب التسمية اللي درتي فـ SQL)
        # ملاحظة: تأكد أن الجدول سميتو 'files' فـ Supabase وعندك فيه حقل 'user_id'
        response = await run_sync_in_async(lambda: supabase.table("files").insert(data).execute())
        
        if response.data:
            file_id = response.data[0]['id']
            print(f"✅ DB: File metadata saved for User {user_id} (ID: {file_id})")
            return file_id
        return None
    except Exception as e:
        print(f"❌ DATABASE ERROR (save_file_info): {e}")
        return None

async def save_analysis_results(file_id, results):
    """حفظ التفاصيل العميقة للتحليل في جدول analyses"""
    try:
        analysis_data = {
            "file_id": file_id,
            "risk_score": int(float(results.get("risk_score", 0))),
            "found_amounts": results.get("found_amounts", []),
            "found_dates": results.get("found_dates", []),
            "critical_clauses": results.get("critical_clauses", []),
            "summary": results.get("intelligence_report", "")
        }
        
        await run_sync_in_async(lambda: supabase.table("analyses").insert(analysis_data).execute())
        print(f"✅ DB: Detailed analysis synced for File: {file_id}")
    except Exception as e:
        print(f"❌ DATABASE ERROR (save_analysis_results): {e}")

async def get_dashboard_data():
    """جلب إحصائيات الـ Dashboard باستخدام Parallel Execution وحماية SSL"""
    try:
        # تعريف المهام (Tasks)
        tasks = [
            run_sync_in_async(lambda: supabase.table("files").select("id", count="exact").execute()),
            run_sync_in_async(lambda: supabase.table("files").select("risk_score").execute()),
            run_sync_in_async(lambda: supabase.table("files").select("*").order("created_at", desc=True).limit(5).execute())
        ]
        
        # تنفيذ المهام بالتوازي
        file_res, risk_res, recent_res = await asyncio.gather(*tasks)

        total_docs = file_res.count if file_res.count is not None else 0
        total_risks = sum([item.get('risk_score', 0) for item in risk_res.data])

        return {
            "total_docs": total_docs,
            "total_risks": total_risks,
            "recent_activity": recent_res.data
        }
    except Exception as e:
        print(f"❌ DB ERROR (get_dashboard_data): {e}")
        return {"total_docs": 0, "total_risks": 0, "recent_activity": []}

async def get_files_from_db():
    """جلب قائمة الملفات كاملة"""
    try:
        res = await run_sync_in_async(lambda: supabase.table("files").select("*").order("created_at", desc=True).execute())
        return res.data
    except Exception:
        return []

async def get_file_by_id(file_id: str):
    """جلب معلومات ملف واحد عن طريق ID"""
    try:
        res = await run_sync_in_async(lambda: supabase.table("files").select("*").eq("id", file_id).execute())
        return res.data[0] if res.data else None
    except Exception:
        return None

async def delete_file_db(file_id: str):
    """مسح الملف والتحليلات المرتبطة به بشكل آمن"""
    try:
        # مسح التحليلات أولاً
        await run_sync_in_async(lambda: supabase.table("analyses").delete().eq("file_id", file_id).execute())
        # مسح الملف الأساسي
        await run_sync_in_async(lambda: supabase.table("files").delete().eq("id", file_id).execute())
        print(f"✅ DB: File {file_id} deleted successfully")
    except Exception as e:
        print(f"❌ DB ERROR (delete_file_db): {e}")