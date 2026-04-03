import requests
from requests.auth import HTTPBasicAuth

# --- الإعدادات الجديدة ---
DOMAIN = "hws-12ecaec.ingress-daribow.ewp.live"
USERNAME = "hsemse7707"
APP_PASSWORD = "W7kT Gnhe bWRt j9WQ t2Pu vVv1" # تأكد من الكود الصحيح بدون مسافات أو بمسافات كما أعطاك ووردبريس

# حاول استخدام هذا الرابط البديل إذا فشل الأول
ENDPOINT = f"https://{DOMAIN}/index.php?rest_route=/wp/v2/posts"

def publish_project():
    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0' # لتمويه الطلب وكأنه من متصفح
    }
    
    payload = {
        "title": "مشروع hse_city الذكي",
        "content": "<h1>نتائج تشغيل بايثون من جهاز hsemse7707</h1><p>تم الربط بنجاح.</p>",
        "status": "publish" 
    }

    print(f"🚀 محاولة الاتصال بـ: {ENDPOINT}")
    
    response = requests.post(
        ENDPOINT,
        auth=HTTPBasicAuth(USERNAME, APP_PASSWORD),
        json=payload,
        headers=headers
    )

    if response.status_code == 201:
        print("✅ نجحت العملية!")
        print(f"🔗 الرابط الجديد: {response.json().get('link')}")
    else:
        print(f"❌ فشل: {response.status_code}")
        # إذا استمر الخطأ، سنطبع أول 200 حرف فقط من الرد لفهمه
        print(response.text[:200])

if __name__ == "__main__":
    publish_project()
