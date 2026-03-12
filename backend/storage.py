import os 
import aioboto3
from dotenv import load_dotenv

# تحميل متغيرات البيئة
load_dotenv()

# إعداد الـ Session والـ Client بطريقة Async
# هاد الطريقة كتخلينا نفتحو Session وحدة ونخدمو بها فـ كاع الـ Requests
session = aioboto3.Session()

BUCKET_NAME = os.environ.get("R2_BUCKET_NAME")
ENDPOINT_URL = os.environ.get("R2_ENDPOINT_URL")
ACCESS_KEY = os.environ.get("R2_ACCESS_KEY")
SECRET_KEY = os.environ.get("R2_SECRET_KEY")
R2_PUBLIC_URL = os.environ.get("R2_PUBLIC_URL")

async def upload_file_to_r2(file_content, file_name):
    """رفع الملف لـ Cloudflare R2 بطريقة غير متزامنة تماماً"""
    try:
        async with session.client(
            "s3",
            endpoint_url=ENDPOINT_URL,
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY,
            region_name="auto"
        ) as s3:
            # الرفع باستخدام put_object الـ Async
            await s3.put_object(
                Bucket=BUCKET_NAME,
                Key=file_name,
                Body=file_content,
                ContentType="application/pdf" # تقدر تردها Dynamic على حسب نوع الملف
            )
        print(f"✅ R2: {file_name} uploaded successfully (Async)")
        return True
    except Exception as e:
        print(f"❌ R2 UPLOAD ERROR: {e}")
        return False

async def delete_from_r2(file_name):
    """مسح الملف من R2 بطريقة Async"""
    try:
        async with session.client(
            "s3",
            endpoint_url=ENDPOINT_URL,
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY,
        ) as s3:
            await s3.delete_object(Bucket=BUCKET_NAME, Key=file_name)
        print(f"✅ R2: {file_name} deleted successfully")
        return True
    except Exception as e:
        print(f"❌ R2 DELETE ERROR: {e}")
        return False