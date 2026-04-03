import requests
from requests.auth import HTTPBasicAuth

# --- الإعدادات ---
BASE_URL = "https://hws-12ecaec.ingress-daribow.ewp.live/wp-json/wp/v2/posts"
USERNAME = "hsemse7707"
APP_PASSWORD = "W7kT Gnhe bWRt j9WQ t2Pu vVv1" # كودك الخاص
TARGET_POST_ID = 9 

def debug_deploy():
    auth = HTTPBasicAuth(USERNAME, APP_PASSWORD)
    
    # مكون Tailwind أنيق جداً (البطاقة الذكية)
    content_html = """
    <div class="flex items-center justify-center min-h-screen bg-slate-900 p-6">
      <div class="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border-t-4 border-indigo-500">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">HSE City Alpha</h2>
        <p class="text-gray-600 leading-relaxed">تم التجريد بنجاح. هذا المحتوى يتم التحكم به كلياً عبر بايثون ولينكس.</p>
        <div class="mt-6 flex gap-2">
          <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">Ready</span>
          <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Secure</span>
        </div>
      </div>
    </div>
    """

    payload = {
        "title": "HSE Master Canvas",
        "content": content_html,
        "status": "publish"
    }

    print(f"📡 محاولة التحديث/الإنشاء للمنشور {TARGET_POST_ID}...")
    
    try:
        # محاولة التعديل أولاً
        url = f"{BASE_URL}/{TARGET_POST_ID}"
        response = requests.post(url, auth=auth, json=payload, timeout=20)
        
        # إذا لم يجد المنشور (404)، سنقوم بإنشاء واحد جديد
        if response.status_code == 404:
            print("🚀 المنشور غير موجود، جاري إنشاء واحد جديد...")
            response = requests.post(BASE_URL, auth=auth, json=payload, timeout=20)

        # التحليل التشخيصي للاستجابة
        if response.ok:
            try:
                data = response.json()
                print(f"✅ نجاح كامل! الرابط: {data.get('link')}")
            except Exception:
                print("⚠️ السيرفر أرسل رداً غير مفهوم (ليس JSON).")
                print(f"📝 بداية الرد المستلم: {response.text[:200]}...") # هنا سنرى الحقيقة
        else:
            print(f"❌ خطأ من السيرفر: {response.status_code}")
            print(f"📝 تفاصيل الخطأ: {response.text[:200]}")

    except Exception as e:
        print(f"🛑 خطأ في الاتصال: {e}")

if __name__ == "__main__":
    debug_deploy()
