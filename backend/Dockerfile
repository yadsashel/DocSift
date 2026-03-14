# استعمل نسخة Python مستقرة
FROM python:3.9

# نصب المكتبات ديال الـ System اللي كيحتاج OCR و OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# كريي مستخدم جديد سميتو user (ضروري لـ Hugging Face)
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:${PATH}"

# تحديد مسار الخدمة فـ الـ Home ديال المستخدم
WORKDIR /home/user/app

# نسخ الـ requirements وتنصيبها
COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# نسخ الكود كامل
COPY --chown=user . .

# تشغيل السيرفر على بورت 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]