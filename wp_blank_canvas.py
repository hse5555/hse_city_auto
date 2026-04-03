import os
import requests
from requests.auth import HTTPBasicAuth

# جلب البيانات من الأسرار (Secrets)
USER = os.getenv('WP_USERNAME', 'hsemse7707')
PASS = os.getenv('WP_PASSWORD')
RAW_URL = os.getenv('WP_URL') # هذا الرابط المخزن في GitHub وينتهي بـ /posts

# تحويل الرابط تلقائياً ليدعم الصفحات (Pages)
# سيقوم بتبديل كلمة posts بكلمة pages في الرابط
BASE_URL = RAW_URL.replace('/posts', '/pages') 
POST_ID = "9" # تأكد أن هذا هو رقم الصفحة (Page ID) وليس المقال

def deploy_to_page():
    if not os.path.exists('dashboard_v2.html'):
        print("❌ الملف dashboard_v2.html غير موجود!")
        return

    with open('dashboard_v2.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    # الرابط النهائي سيكون مثل: .../wp-json/wp/v2/pages/9
    endpoint = f"{BASE_URL}/{POST_ID}"
    
    payload = {
        'content': html_content,
        'status': 'publish'
    }

    auth = HTTPBasicAuth(USER, PASS)
    response = requests.post(endpoint, json=payload, auth=auth)

    if response.status_code == 200:
        print(f"✅ تم التحديث بنجاح كـ (Page)!")
        print(f"🔗 الرابط الجديد: {response.json().get('link')}")
    else:
        print(f"❌ فشل: {response.status_code} - {response.text}")

if __name__ == "__main__":
    deploy_to_page()
