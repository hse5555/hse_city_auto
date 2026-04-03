import os
import requests
from requests.auth import HTTPBasicAuth

USER = os.getenv('WP_USERNAME', 'hsemse7707')
PASS = os.getenv('WP_PASSWORD')
RAW_URL = os.getenv('WP_URL', '')

# تحويل الرابط تلقائياً ليدعم الصفحات
BASE_URL = RAW_URL.replace('/posts', '/pages') 
POST_ID = "9" 

def deploy_to_page():
    if not os.path.exists('dashboard_v2.html'):
        print("❌ الملف dashboard_v2.html غير موجود!")
        return

    with open('dashboard_v2.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    endpoint = f"{BASE_URL}/{POST_ID}"
    payload = {'content': html_content, 'status': 'publish'}
    auth = HTTPBasicAuth(USER, PASS)

    print(f"🚀 جاري الرفع إلى: {endpoint}...")
    response = requests.post(endpoint, json=payload, auth=auth)

    if response.status_code == 200:
        print("✅ تم التحديث بنجاح!")
        # محاولة قراءة الرابط بأمان
        try:
            link = response.json().get('link')
            print(f"🔗 الرابط: {link}")
        except Exception:
            print("⚠️ تم التحديث ولكن تعذر استخراج الرابط تلقائياً.")
    else:
        print(f"❌ فشل: {response.status_code}")
        print(f"📝 الرد من السيرفر: {response.text[:200]}")

if __name__ == "__main__":
    deploy_to_page()
