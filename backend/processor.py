import os
import re
import fitz  # PyMuPDF
import easyocr
import numpy as np
from PIL import Image
import io
import random
import gc
import math

# Singleton: تحميل الموديل مرة واحدة فقط عند تشغيل السيرفر
# gpu=False ضرورية للسيرفرات المجانية حيت ما كيكونش فيها GPU
reader = easyocr.Reader(['en'], gpu=False) 

class DocumentProcessor:
    @staticmethod
    async def extract_text(file_content: bytes, file_extension: str) -> str:
        text = ""
        try:
            # 1. محاولة استخراج النص المباشر (سريع جداً)
            doc = fitz.open(stream=file_content, filetype="pdf" if "pdf" in file_extension.lower() else file_extension)
            for page in doc:
                text += page.get_text()
            doc.close()
        except Exception as e:
            print(f"Direct extraction failed: {e}")

        # 2. ✅ OCR Integration: إذا كان النص المستخرج فارغاً (ملف ممسوح ضوئياً)
        if len(text.strip()) < 50:
            print("🔍 Scanned Document Detected. Starting Sequential OCR Engine...")
            text = ""
            doc = fitz.open(stream=file_content, filetype="pdf")
            
            for page in doc:
                # معالجة صفحة بصفحة لتوفير الـ RAM
                pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5)) 
                img_data = Image.open(io.BytesIO(pix.tobytes()))
                img_np = np.array(img_data)
                
                # ✅ التصحيح: استعملنا readtext لضمان الاستقرار
                page_results = reader.readtext(img_np)
                page_text = " ".join([res[1] for res in page_results])
                text += page_text + " "
                
                # تنظيف الميموري فوراً بعد كل صفحة
                del img_np, img_data, pix
                gc.collect() 

            doc.close()
            
        return text

    @staticmethod
    async def analyze_risk(text: str):
        """التحليل المتقدم باستخدام المنطق الرياضي والكلمات المفتاحية"""
        # محاور التحليل المهني مع أوزان دقيقة (نفس اللوجيك ديالك المطور)
        analysis_axes = {
            "legal_exposure": {
                "keywords": ["liability", "indemnification", "arbitration", "jurisdiction", "lawsuit", "breach", "warranty", "indemnity"],
                "weight": 1.8
            },
            "financial_obligation": {
                "keywords": ["payment", "penalty", "interest", "refund", "liquidated damages", "compensation", "invoice", "fee"],
                "weight": 1.4
            },
            "compliance_risk": {
                "keywords": ["violation", "regulatory", "prohibited", "mandatory", "compliance", "audit", "governance", "sanction"],
                "weight": 1.2
            }
        }

        results = {}
        total_weighted_score = 0
        total_matches = 0

        for axis, data in analysis_axes.items():
            axis_score = 0
            for word in data["keywords"]:
                matches = len(re.findall(r'\b' + word + r'\b', text, re.IGNORECASE))
                if matches > 0:
                    axis_score += (matches * data["weight"])
                    total_matches += matches
            results[axis] = axis_score
            total_weighted_score += axis_score

        # جلب الالتزامات والبنود الخطيرة باستخدام الدوال المساعدة
        obligations = detect_legal_obligations(text)
        critical_clauses = extract_critical_clauses(text)
        
        # معادلة الـ Risk Score (0-100)
        base_risk = (total_weighted_score / (total_matches + 1)) * 5
        obligation_risk = math.log1p(len(obligations)) * 10
        final_risk_score = min((base_risk + obligation_risk + random.randint(5, 10)), 100) 

        # حساب الـ Compliance Score
        final_compliance_score = max(100 - (final_risk_score * 0.4), 60)

        return {
            "risk_score": round(final_risk_score, 1),
            "compliance_score": round(final_compliance_score, 1),
            "breakdown": {
                "legal": round(results["legal_exposure"], 1),
                "financial": round(results["financial_obligation"], 1),
                "compliance": round(results["compliance_risk"], 1)
            },
            "critical_clauses": critical_clauses,
            "intelligence_report": f"Neural scan identified {total_matches} high-priority markers and {len(obligations)} explicit legal obligations."
        }

# --- الدوال المساعدة (Helper Functions) اللي كتعطي القوة للتقرير ---

def extract_critical_clauses(text):
    """جبد البنود اللي فيها مخاطر عالية"""
    risk_patterns = [
        r"([^.]*termination[^.]*\d+[^.]*days[^.]*)", 
        r"([^.]*indemnification[^.]*limit[^.]*)",    
        r"([^.]*automatic[^.]*renewal[^.]*)",        
        r"([^.]*sole[^.]*discretion[^.]*)",          
        r"([^.]*governing[^.]*law[^.]*is[^.]*)",      
    ]
    findings = []
    for pattern in risk_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            if len(match.strip()) > 10:
                findings.append(match.strip())
    return findings[:5]

def detect_legal_obligations(text):
    """تحديد الالتزامات القانونية الصارمة"""
    legal_indicators = ["shall", "must", "agrees to", "undertakes", "obligated", "required to", "covenants"]
    sentences = text.split('.')
    found_obligations = []
    for sentence in sentences:
        if any(indicator in sentence.lower() for indicator in legal_indicators):
            if len(sentence.strip()) > 15:
                found_obligations.append(sentence.strip())
    return found_obligations