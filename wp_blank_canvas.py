import os
import requests
from requests.auth import HTTPBasicAuth

USER = os.getenv('WP_USERNAME', 'hsemse7707')
PASS = os.getenv('WP_PASSWORD')
URL = os.getenv('WP_URL')
POST_ID = "9" # الرقم الذي يظهر في لوحة تحكم ووردبريس لهذه الصفحة

def deploy_pure_dashboard():
    # قراءة الملف الذي نقلناه للتو
    with open('dashboard_v2.html', 'r', encoding='utf-8') as f:
        dashboard_html = f.read()

    # إعداد البيانات لإرسالها
    payload = {
        'content': dashboard_html,
        'status': 'publish',
        'title': 'HSE Master Dashboard'
    }

    auth = HTTPBasicAuth(USER, PASS)
    endpoint = f"{URL.split('/posts')[0]}/posts/{POST_ID}"
    
    response = requests.post(endpoint, json=payload, auth=auth)

    if response.status_code == 200:
        print("✅ تم التطهير والرفع بنجاح!")
    else:
        print(f"❌ خطأ: {response.status_code}")

if __name__ == "__main__":
    deploy_pure_dashboard()
