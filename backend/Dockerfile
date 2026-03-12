# Dockerfile
FROM python:3.9

# نصب المكتبات ديال الـ System اللي كيحتاج OCR
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . .

# Hugging Face كيبغي البورت 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]