import requests
from requests.auth import HTTPBasicAuth

# --- بيانات الاعتماد (تأكد من دقتها) ---
DOMAIN = "hws-12ecaec.ingress-daribow.ewp.live"
USERNAME = "hsemse7707" # اسم المستخدم في ووردبريس
APP_PASSWORD = "W7kT Gnhe bWRt j9WQ t2Pu vVv1" # كود الـ 24 حرفاً الذي حصلت عليه
ENDPOINT = f"https://{DOMAIN}/wp-json/wp/v2/posts"

def publish_project(title, html_content, status='private', post_password=None):
    """
    نشر المشروع مع خيارات حماية متقدمة
    status: 'publish' (عام), 'private' (خاص للمدراء), 'pending' (مراجعة)
    """
    payload = {
        "title": title,
        "content": html_content,
        "status": status,
        "format": "standard",
    }
    
    # إضافة كلمة مرور للمنشور إذا طلبت ذلك (خيار الحماية المرن)
    if post_password:
        payload["password"] = post_password

    response = requests.post(
        ENDPOINT,
        auth=HTTPBasicAuth(USERNAME, APP_PASSWORD),
        json=payload
    )

    if response.status_code == 201:
        print(f"✅ تم النشر بنجاح!")
        print(f"🔗 الرابط: {response.json().get('link')}")
    else:
        print(f"❌ خطأ في النشر: {response.status_code}")
        print(response.text)

# --- تجهيز المحتوى (مثال لمشروع HTML) ---
if __name__ == "__main__":
    project_title = "مشروع نظام الأتمتة - النسخة الأولى"
    
    # هنا يمكنك قراءة كود HTML من ملف خارجي أو كتابته مباشرة
    project_body = """
    <div style="border: 2px solid #0073aa; padding: 20px; border-radius: 10px;">
        <h2 style="color: #23282d;">تقرير حالة النظام (Linux)</h2>
        <p>تم استخراج البيانات من جهاز <strong>DESKTOP-KRSTFC9</strong></p>
        <hr>
        <code>
            # مخرجات تشغيل كود لينكس وبايثون تظهر هنا
            System status: Optimal
            Active Venv: True
        </code>
    </div>
    """
    
    # تشغيل الأمر (مع كلمة مرور للحماية)
    publish_project(project_title, project_body, status='publish', post_password="HSE_CITY_2026")
