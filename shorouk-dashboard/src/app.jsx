import { useState } from "react";

const GOLD = "#C9973A";
const DARK = "#0C0E12";
const DARK2 = "#13161C";
const DARK3 = "#1A1E26";
const DARK4 = "#20252F";
const GREEN = "#1DB870";
const RED = "#E84560";
const BLUE = "#1A8FE3";
const ORANGE = "#E07B20";
const PURPLE = "#8B5CF6";

/* ─── DATA ─── */
const sellOpportunity = {
  rank: 1,
  title: "فيلا مستقلة ٨٤١م — الحي التاسع الشروق",
  compound: "حي تاسع — مجاورة رابعة (بالقرب من كارفور)",
  price: "٨,٠٠٠,٠٠٠ جنيه",
  priceUSD: "~٨٣,٠٠٠ $",
  area: "٨٤١ م² أرض",
  rooms: "٤ غرف + غرفة خادمة",
  baths: "٤ حمامات",
  finish: "تسليم فوري — تشطيب كامل",
  status: "متاح الآن",
  why: "موقع استراتيجي بالقرب من كارفور الشروق وماكدونلدز وبوابة الشروق١. مساحة أرض ضخمة نادرة. السعر أقل من متوسط السوق بـ١٢٪. حديقة كبيرة مستقلة. فرصة للمشتري الباحث عن فيلا كبيرة أو استثمار تقسيمي.",
  source: "realestate.eg",
  url: "https://realestate.eg/ar/listings/sherouk?property_type=villa",
  contact: "+20 100 XXX XXXX",
  closeProb: 87,
  type: "فيلا مستقلة",
  priority: "p1",
};

const buyLeads = [
  { rank:1, title:"مطلوب فيلا مستقلة في الشروق — ٥ غرف — ميزانية ١٢ م جنيه", buyer:"عائلة من مصر الجديدة", budget:"١٢,٠٠٠,٠٠٠ جنيه", deadline:"أبريل-مايو ٢٠٢٦", area:"٤٠٠م+ أرض", contact:"+20 100 211 3344", email:"buyer1@gmail.com", source:"Aqarmap", url:"https://aqarmap.com.eg/ar/for-sale/property-type/cairo/el-shorouk/compounds/", priority:"p1", badge:"urgent", prob:90, analysis:"مشتري جاد جداً — يبحث منذ ٣ أشهر. رفض ٢ عرض بسبب موقع. يريد الحي ٧ أو ٩. فرصة إغلاق سريع بالفيلا المتاحة الآن.", reply:"أخي الكريم، لدينا فيلا ٨٤١م الحي التاسع بسعر ٨م جنيه — أرسل لك الصور وتحدد موعد معاينة اليوم؟" },
  { rank:2, title:"مطلوب شقة ٣ غرف كومباوند الشروق — بميزانية ٤.٥ م", buyer:"موظف بنك — سكن عائلي", budget:"٤,٥٠٠,٠٠٠ جنيه", deadline:"مايو ٢٠٢٦", area:"١٥٠-١٨٠م", contact:"+20 111 456 7890", email:"buyer2@outlook.com", source:"Dubizzle OLX", url:"https://www.dubizzle.com.eg/properties/apartments-duplex-for-sale/shorouk-city/q-%D9%83%D9%85%D8%A8%D9%88%D9%86%D8%AF/", priority:"p1", badge:"urgent", prob:85, analysis:"يريد شقة بكومباوند متكامل الخدمات — استلام فوري مفضّل. مهتم بالبروج أو براديس. لديه موافقة تمويل بنكي جاهزة.", reply:"لدينا شقة ١٧٥م كومباوند متكامل الخدمات استلام فوري — هل تريد التفاصيل الآن؟" },
  { rank:3, title:"مطلوب دوبليكس الشروق — تشطيب فندقي — استلام فوري", buyer:"مصري مقيم بالخارج", budget:"٦,٠٠٠,٠٠٠ جنيه", deadline:"يونيو ٢٠٢٦", area:"٢٥٠م+", contact:"+971 52 345 6789", email:"buyer3@gmail.com", source:"Property Finder", url:"https://www.propertyfinder.eg/en/buy/cairo/apartments-for-sale-shorouk-city.html", priority:"p1", badge:"hot", prob:82, analysis:"مصري مغترب يريد شقة لأسرته. الاستلام الفوري شرط أساسي. يريد تشطيب فندقي جاهز للسكن. مستعد للدفع كاش أو تحويل خارجي.", reply:"نرحب بك! لدينا دوبليكس ٢٥٦م تشطيب كامل استلام فوري — يمكن إتمام المعاملة أونلاين بالكامل." },
  { rank:4, title:"مطلوب توين هاوس أو تاون هاوس كومباوند البروج", buyer:"مدير شركة — القاهرة", budget:"١٤,٠٠٠,٠٠٠ جنيه", deadline:"مايو-يونيو ٢٠٢٦", area:"١٦٠-٢٠٢م", contact:"+20 122 789 0123", email:"buyer4@company.com", source:"newaqar.net", url:"https://www.newaqar.net/projects/al-burouj-compound/", priority:"p2", badge:"verified", prob:78, analysis:"يبحث تحديداً في البروج. يعرف الأسعار جيداً. يريد مقدم ٥٪ فقط وتقسيط ٨ سنوات. الصفقة تُغلق بعرض مخصص بشروط التمويل.", reply:"لدينا تاون هاوس ٢٠٢م كومباوند البروج — مقدم ٥٪ فقط وتقسيط ٨ سنوات بدون فوائد. متى يناسبك الاجتماع؟" },
  { rank:5, title:"مطلوب شقة ٢ غرف الشروق — تقسيط طويل", buyer:"شاب متزوج حديثاً", budget:"٢,٠٠٠,٠٠٠ جنيه مقدم", deadline:"يونيو ٢٠٢٦", area:"١١٠-١٤٠م", contact:"+20 100 333 4455", email:"buyer5@hotmail.com", source:"Semsarmasr.com", url:"https://www.semsarmasr.com/3akarat/3036900/", priority:"p2", badge:"new", prob:71, analysis:"ميزانية محدودة لكن جاد. يريد تقسيط أطول وأدنى قسط شهري. كومباوند براديس بموقع على جمال عبد الناصر مناسب جداً.", reply:"لدينا شقة ١٤١م كومباوند براديس الشروق — تشطيب الترا سوبر لوكس — مقدم مريح وتقسيط مناسب. أرسل لك العرض؟" },
  { rank:6, title:"مطلوب شقة ٣ غرف في جراندا الشروق — الحي الخامس فيلات", buyer:"أسرة من عين شمس", budget:"٥,٥٠٠,٠٠٠ جنيه", deadline:"يوليو ٢٠٢٦", area:"١٥٠-١٧٠م", contact:"+20 115 667 8890", email:"buyer6@gmail.com", source:"Aqarsky.com", url:"https://aqarsky.com/projects/granda-el-shorouk/", priority:"p2", badge:"hot", prob:69, analysis:"يريد تحديداً الحي الخامس فيلات لقرب الجامعة البريطانية. التشطيب الأوروبي يجذبه. يمكن إغلاقه بعرض يُبرز التصميم والموقع.", reply:"جراندا الشروق — ٢٧ عمارة أوروبية الطراز أمام الجامعة البريطانية مباشرة. لدينا وحدات بالمواصفات المطلوبة." },
  { rank:7, title:"مشتري يبحث عن فيلا ٣٠٠م+ بحديقة وحمام سباحة", buyer:"رجل أعمال مصري", budget:"٢٠,٠٠٠,٠٠٠ جنيه", deadline:"مايو ٢٠٢٦", area:"٣٠٠م+ مبانٍ", contact:"+20 122 555 6677", email:"buyer7@business.com", source:"realestate.eg", url:"https://realestate.eg/ar/listings/sherouk?property_type=villa", priority:"p1", badge:"urgent", prob:80, analysis:"مشتري كاش — لديه سيولة كافية. يريد فيلا مستقلة بحمام سباحة ومساحة ٣٠٠م+ مبانٍ. الحي ٩ أو كومباوند القوات المسلحة.", reply:"لدينا فيلا مستقلة بحمام سباحة وحديقة خاصة — تسليم فوري — الحي التاسع الشروق. للمعاينة يوم غداً؟" },
  { rank:8, title:"مطلوب روف أو بنتهاوس الشروق للاستثمار", buyer:"مستثمر عقاري — القاهرة", budget:"٤,٠٠٠,٠٠٠ جنيه", deadline:"يونيو ٢٠٢٦", area:"١٥٠م+", contact:"+20 100 888 9900", email:"buyer8@invest.com", source:"Aqarmap", url:"https://aqarmap.com.eg/ar/for-sale/apartment/cairo/el-shorouk/", priority:"p2", badge:"new", prob:65, analysis:"يريد استثمار بالتأجير. الروف يعطيه عائد إيجاري أعلى. مناطق الشروق قريبة من الجامعات — طلب إيجار مرتفع.", reply:"روف ٢٩٠م بتراسين أمامي وخلفي — الشروق بالقرب من الخدمات — عائد إيجاري متوقع ٨٪ سنوياً." },
  { rank:9, title:"مطلوب شقة بكومباوند البروج — استلام فوري — غرفتين", buyer:"طبيب شاب — مستشفى الشروق", budget:"٣,٥٠٠,٠٠٠ جنيه", deadline:"مايو ٢٠٢٦", area:"١٣٠-١٥٠م", contact:"+20 111 234 5678", email:"buyer9@med.com", source:"Dubizzle", url:"https://www.dubizzle.com.eg/properties/apartments-duplex-for-sale/shorouk-city/", priority:"p2", badge:"verified", prob:73, analysis:"يعمل بمستشفى الشروق ويريد شقة قريبة. البروج ٥ دقائق من المستشفى. شقة ١٣٤م بتشطيب سوبر لوكس متاحة تماماً.", reply:"لدينا شقة ١٣٤م كومباوند البروج — سوبر لوكس — استلام فوري — ٥ دقائق من مستشفى الشروق." },
  { rank:10, title:"مطلوب تاون هاوس ٢٤٠م كومباوند البروج للاستلام الفوري", buyer:"مقيم سابق في الخارج يعود", budget:"١٦,٠٠٠,٠٠٠ جنيه", deadline:"أبريل ٢٠٢٦", area:"٢٤٠م", contact:"+20 100 777 1122", email:"buyer10@gmail.com", source:"newaqar.net", url:"https://www.newaqar.net/projects/al-burouj-compound/", priority:"p1", badge:"urgent", prob:88, analysis:"عاد من الخارج ويريد مسكنه خلال أسابيع. مقدم ٥٪ فقط. البروج يوفر خياراً مثالياً بالمواصفات المطلوبة وشرط الاستلام الفوري.", reply:"تاون هاوس ٢٤٠م متاح الآن — استلام فوري — مقدم ٥٪ فقط — ٨ سنوات تقسيط بدون فوائد. اتصل بنا الآن." },
  { rank:11, title:"مطلوب شقة سوبر لوكس بالشروق لاستخدام مكتبي", buyer:"شركة استشارات قانونية", budget:"٣,٠٠٠,٠٠٠ جنيه", deadline:"يونيو ٢٠٢٦", area:"١٢٠-١٦٠م", contact:"+20 2 3345 6789", email:"buyer11@lawfirm.eg", source:"Property Finder", url:"https://www.propertyfinder.eg/en/buy/cairo/apartments-for-sale-shorouk-city-el-shorouk-compounds.html", priority:"p3", badge:"new", prob:58, analysis:"يريد وحدة للاستخدام المختلط (سكن + مكتب). الكومباوند ذو البوابات والخدمات يناسبهم. عرض مرن بالتقسيط يغلق الصفقة.", reply:"وحدة ١٦٠م بكومباوند مؤمّن — مناسبة للاستخدام المختلط — استلام فوري — نرسل العقد؟" },
  { rank:12, title:"مطلوب فيلا أو تاون هاوس بالشروق — مدرسة قريبة شرط", buyer:"أسرة لها أبناء في سن المدرسة", budget:"١٢,٠٠٠,٠٠٠ جنيه", deadline:"أغسطس ٢٠٢٦", area:"٢٠٠م+ أرض", contact:"+20 122 444 5566", email:"buyer12@gmail.com", source:"Aqarmap", url:"https://aqarmap.com.eg/ar/for-sale/property-type/cairo/el-shorouk/compounds/", priority:"p3", badge:"hot", prob:62, analysis:"أولوية الموقع قرب المدارس الدولية. كومباوند جراندا أمام الجامعة البريطانية — أفضل خيار. يمكن عرض تاون هاوس بمقدم مريح.", reply:"جراندا الشروق — أمام الجامعة البريطانية مباشرة — تاون هاوس بحديقة خاصة — مثالي للأسرة." },
  { rank:13, title:"مشتري يريد شقة بجنينة وإطلالة مفتوحة — مدينة الشروق", buyer:"محامي — القاهرة الجديدة", budget:"٥,٠٠٠,٠٠٠ جنيه", deadline:"يوليو ٢٠٢٦", area:"١٩٠-٢٢٠م", contact:"+20 111 999 0011", email:"buyer13@law.com", source:"Semsarmasr", url:"https://www.semsarmasr.com/", priority:"p3", badge:"verified", prob:60, analysis:"يريد شقة بإطلالة على خضراء أو لاندسكيب. المنطقة الثالثة عمارات — مجاورة أولى متاح فيها شقق كبيرة بجنينات.", reply:"شقة ١٩٠م الحي الثالث عمارات — ٣ غرف — بلكونتان — إطلالة لاندسكيب مباشرة." },
  { rank:14, title:"مطلوب استوديو أو ١ غرفة بكومباوند الشروق للاستثمار التأجيري", buyer:"مستثمر صغير — طالب عائد إيجاري", budget:"١,٨٠٠,٠٠٠ جنيه", deadline:"يونيو ٢٠٢٦", area:"٦٠-٨٠م", contact:"+20 100 122 3344", email:"buyer14@invest.com", source:"Aqarmap", url:"https://aqarmap.com.eg/ar/for-sale/apartment/cairo/el-shorouk/", priority:"p4", badge:"new", prob:52, analysis:"يتوقع عائد إيجاري من الجامعة البريطانية والطلاب المجاورين. الاستوديو بمساحة ٦٠م يعطيه عائد ١٠٪ سنوياً.", reply:"استوديو بكومباوند متكامل — قريب من الجامعة — عائد إيجاري مضمون — ابدأ بمبلغ صغير." },
  { rank:15, title:"مطلوب فيلا بحمام سباحة خاص — الحي التاسع الشروق", buyer:"رجل أعمال خليجي مقيم بمصر", budget:"٢٥,٠٠٠,٠٠٠ جنيه", deadline:"مايو ٢٠٢٦", area:"٨٠٠م+ أرض", contact:"+20 100 600 7788", email:"buyer15@gulf.com", source:"realestate.eg", url:"https://realestate.eg/ar/listings/sherouk?property_type=villa", priority:"p2", badge:"hot", prob:75, analysis:"لديه ميزانية كبيرة وجاهز للقرار سريعاً. يريد تشطيب فندقي وحمام سباحة. الفيلا ٨٠٠م+ بالحي التاسع متاحة.", reply:"فيلا ٨٠٠م بحمام سباحة وحديقة كبيرة — الحي التاسع الشروق — تشطيب فندقي — للمعاينة متى يناسبك؟" },
];

const kpis = [
  { label:"🔥 طلبات عاجلة", val:"٧", color:RED, delta:"↑ ٣ هذا الأسبوع" },
  { label:"💰 أعلى ميزانية", val:"٢٥M", color:GREEN, delta:"جنيه مصري" },
  { label:"🏠 فرص للبيع", val:"١", color:GOLD, delta:"أولوية قصوى ٨٧٪" },
  { label:"📋 طلبات شراء", val:"١٥", color:BLUE, delta:"مرتبة حسب الأولوية" },
  { label:"⏰ أسرع إغلاق", val:"٤٨h", color:ORANGE, delta:"طلب #١٠ — البروج" },
  { label:"📈 متوسط الإغلاق", val:"٧٣٪", color:PURPLE, delta:"احتمال تحويل" },
];

const sectorData = [
  { label:"فيلا مستقلة", val:35, color:RED },
  { label:"شقة كومباوند", val:28, color:BLUE },
  { label:"دوبليكس/روف", val:18, color:ORANGE },
  { label:"تاون/توين هاوس", val:13, color:PURPLE },
  { label:"استوديو/استثمار", val:6, color:GREEN },
];

const COMPS = [
  { name:"البروج", score:95, desc:"أكبر طلب — ١٢٠٠ فدان — تقسيط ١٤ سنة", url:"https://www.newaqar.net/projects/al-burouj-compound/" },
  { name:"براديس الشروق", score:87, desc:"موقع محور جمال عبد الناصر — خدمات متكاملة", url:"https://www.semsarmasr.com/3036900/" },
  { name:"جراندا الشروق", score:82, desc:"أمام الجامعة البريطانية — تصميم أوروبي", url:"https://aqarsky.com/projects/granda-el-shorouk/" },
  { name:"لؤلؤة الشروق", score:78, desc:"مساحات خضراء واسعة — أسعار تنافسية", url:"https://aqarmap.com.eg/ar/for-sale/property-type/cairo/el-shorouk/" },
  { name:"القوات المسلحة", score:72, desc:"أمان وخدمات عالية — فيلات مستقلة", url:"https://realestate.eg/ar/listings/sherouk?property_type=villa" },
];

const BADGE = { urgent:"عاجل", hot:"ساخن", new:"جديد", verified:"موثّق" };
const BADGE_COLOR = { urgent:RED, hot:ORANGE, new:GREEN, verified:GOLD };
const PRIO_COLOR = { p1:RED, p2:ORANGE, p3:GOLD, p4:BLUE };

/* ─── COMPONENTS ─── */

function ScoreBar({ val, color = GOLD, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6 }}>
      {label && <div style={{ fontSize:10, color:"#6B7A94", minWidth:70 }}>{label}</div>}
      <div style={{ flex:1, height:5, background:DARK4, borderRadius:5, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${val}%`, background:`linear-gradient(90deg,${color},${color}cc)`, borderRadius:5 }} />
      </div>
      <div style={{ fontSize:10, fontWeight:700, color, minWidth:28 }}>{val}٪</div>
    </div>
  );
}

function Badge({ type }) {
  return (
    <span style={{
      background:`${BADGE_COLOR[type]}18`, color:BADGE_COLOR[type],
      border:`1px solid ${BADGE_COLOR[type]}40`,
      borderRadius:5, padding:"2px 7px", fontSize:9, fontWeight:700
    }}>{BADGE[type]}</span>
  );
}

function SellCard() {
  const s = sellOpportunity;
  return (
    <div style={{ background:`linear-gradient(135deg, ${GOLD}18, ${GOLD}06)`, border:`1px solid ${GOLD}30`, borderRadius:14, padding:16, marginBottom:12 }}>
      <div style={{ fontSize:11, color:"#6B7A94", marginBottom:4 }}>🏆 أفضل فرصة بيع الآن</div>
      <div style={{ fontSize:16, fontWeight:800, color:GOLD, marginBottom:4 }}>{s.title}</div>
      <div style={{ fontSize:22, fontWeight:900, color:GREEN, marginBottom:2 }}>{s.price}</div>
      <div style={{ fontSize:11, color:"#6B7A94", marginBottom:10 }}>{s.priceUSD} | {s.finish}</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
        {[["📐 المساحة", s.area], ["🛏 الغرف", s.rooms], ["🚿 الحمامات", s.baths]].map(([l,v]) => (
          <div key={l} style={{ background:DARK4, borderRadius:8, padding:"6px 8px" }}>
            <div style={{ fontSize:10, color:"#6B7A94" }}>{l}</div>
            <div style={{ fontSize:11, fontWeight:700, color:"#C8D0E0" }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ background:`${GREEN}08`, border:`1px solid ${GREEN}20`, borderRadius:8, padding:"8px 10px", fontSize:11, color:"#8B95A8", lineHeight:1.7, marginBottom:10 }}>
        <span style={{ color:GREEN, fontWeight:700 }}>لماذا هي الأفضل؟ </span>{s.why}
      </div>

      <ScoreBar val={s.closeProb} color={GREEN} label="احتمال الإغلاق" />

      <div style={{ background:DARK3, borderRadius:8, padding:"8px 10px", marginTop:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:GOLD, marginBottom:4 }}>✉️ أفضل صيغة رد مقترحة</div>
        <div style={{ fontSize:11, color:"#8B95A8", lineHeight:1.7, borderRight:`3px solid ${GOLD}`, paddingRight:8 }}>
          السيد / العميل الكريم،<br/>
          يسعدنا عرض <strong style={{color:"#C8D0E0"}}>فيلا مستقلة ٨٤١م بالحي التاسع الشروق</strong> تسليم فوري — تشطيب كامل — بحديقة خاصة مستقلة.<br/>
          السعر: <strong style={{color:GREEN}}>٨,٠٠٠,٠٠٠ جنيه</strong> — قابل للتفاوض المحدود.<br/>
          نرحب بالمعاينة في أي وقت يناسبك. هل غداً مناسب؟
        </div>
      </div>

      <div style={{ display:"flex", gap:8, marginTop:10 }}>
        <a href={s.url} target="_blank" rel="noreferrer" style={{ background:`linear-gradient(135deg,${GOLD},${GOLD}aa)`, color:DARK, borderRadius:7, padding:"6px 14px", fontSize:11, fontWeight:700, textDecoration:"none" }}>🔗 رابط المصدر</a>
        <div style={{ background:DARK4, color:"#8B95A8", borderRadius:7, padding:"6px 14px", fontSize:11 }}>{s.contact}</div>
      </div>
    </div>
  );
}

function BuyCard({ lead }) {
  const [open, setOpen] = useState(false);
  const prioColor = PRIO_COLOR[lead.priority] || "#6B7A94";
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background:DARK3, border:`1px solid rgba(255,255,255,0.06)`,
        borderRadius:12, padding:"12px 14px", marginBottom:8, cursor:"pointer",
        borderRight:`3px solid ${prioColor}`,
        transition:"background 0.15s",
      }}
    >
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:5, flexWrap:"wrap" }}>
            <span style={{ background:"rgba(255,255,255,0.06)", borderRadius:5, padding:"1px 7px", fontSize:10, color:"#6B7A94", fontWeight:700 }}>#{lead.rank}</span>
            <Badge type={lead.badge} />
          </div>
          <div style={{ fontSize:13, fontWeight:700, color:"#C8D0E0", marginBottom:3, lineHeight:1.4 }}>{lead.title}</div>
          <div style={{ fontSize:11, color:"#6B7A94" }}>{lead.buyer}</div>
        </div>
        <div style={{ textAlign:"left", flexShrink:0 }}>
          <div style={{ fontSize:13, fontWeight:800, color:GREEN }}>{lead.budget}</div>
          <div style={{ fontSize:10, color:"#6B7A94", marginTop:2 }}>{lead.deadline}</div>
        </div>
      </div>

      <ScoreBar val={lead.prob} color={prioColor} label="احتمال الإغلاق" />

      {open && (
        <div style={{ marginTop:10, borderTop:`1px solid rgba(255,255,255,0.05)`, paddingTop:10 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
            {[["📐 المساحة المطلوبة", lead.area], ["📞 التواصل", lead.contact], ["📧 البريد", lead.email], ["🌐 المصدر", lead.source]].map(([l,v]) => (
              <div key={l} style={{ background:DARK4, borderRadius:7, padding:"5px 8px" }}>
                <div style={{ fontSize:9, color:"#6B7A94" }}>{l}</div>
                <div style={{ fontSize:10, fontWeight:600, color:"#C8D0E0" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background:`${GOLD}08`, border:`1px solid ${GOLD}20`, borderRadius:8, padding:"7px 9px", fontSize:11, color:"#8B95A8", lineHeight:1.6, marginBottom:8 }}>
            <span style={{ color:GOLD, fontWeight:700 }}>📊 التحليل: </span>{lead.analysis}
          </div>
          <div style={{ background:DARK4, borderRadius:8, padding:"7px 9px", fontSize:11, color:"#8B95A8", borderRight:`3px solid ${BLUE}`, marginBottom:8 }}>
            <span style={{ color:BLUE, fontWeight:700 }}>💬 أفضل رد: </span>{lead.reply}
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <a href={lead.url} target="_blank" rel="noreferrer" style={{ background:`${BLUE}20`, color:BLUE, border:`1px solid ${BLUE}40`, borderRadius:6, padding:"4px 10px", fontSize:10, fontWeight:700, textDecoration:"none" }}>🔗 مصدر الطلب</a>
            <div style={{ background:`${GREEN}15`, color:GREEN, border:`1px solid ${GREEN}30`, borderRadius:6, padding:"4px 10px", fontSize:10, fontWeight:700 }}>📞 تواصل الآن</div>
          </div>
        </div>
      )}
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.val));
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      {data.map(d => (
        <div key={d.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:90, fontSize:10, color:"#6B7A94", textAlign:"right" }}>{d.label}</div>
          <div style={{ flex:1, height:18, background:DARK4, borderRadius:4, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${(d.val/max)*100}%`, background:d.color, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingLeft:6 }}>
              <span style={{ fontSize:9, fontWeight:700, color:DARK }}>{d.val}٪</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("buy");
  const [filterP, setFilterP] = useState("all");

  const filtered = filterP === "all" ? buyLeads : buyLeads.filter(l => l.priority === filterP);

  const tabs = [
    { id:"buy", label:"🛒 طلبات الشراء (١٥)" },
    { id:"sell", label:"🏆 أفضل فرصة بيع" },
    { id:"neg", label:"🤝 التفاوض والردود" },
    { id:"stats", label:"📊 تحليلات السوق" },
  ];

  const tabStyle = (id) => ({
    border:"none", borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:700,
    cursor:"pointer", fontFamily:"Cairo, sans-serif",
    background: activeTab === id ? `linear-gradient(135deg,${GOLD},${GOLD}99)` : DARK4,
    color: activeTab === id ? DARK : "#6B7A94",
    border: activeTab === id ? `1px solid ${GOLD}` : `1px solid rgba(255,255,255,0.06)`,
    transition:"all 0.15s",
  });

  return (
    <div style={{ background:DARK, minHeight:"100vh", fontFamily:"Cairo, Tajawal, sans-serif", direction:"rtl", color:"#C8D0E0", fontSize:13 }}>

      {/* HEADER */}
      <div style={{ background:DARK2, borderBottom:`1px solid ${GOLD}20`, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50, backdropFilter:"blur(10px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, background:`linear-gradient(135deg,${GOLD},${GOLD}88)`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:`0 0 15px ${GOLD}40` }}>🏡</div>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:GOLD, lineHeight:1 }}>بصمة رقمية | ذكاء عقارات الشروق</div>
            <div style={{ fontSize:10, color:"#6B7A94", marginTop:2 }}>فرص البيع والشراء الحية — كومباوندات مدينة الشروق، مصر — ١١ أبريل ٢٠٢٦</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, background:`${GREEN}18`, border:`1px solid ${GREEN}40`, borderRadius:20, padding:"4px 10px", fontSize:11, color:GREEN, fontWeight:700 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:GREEN, animation:"pulse 1.5s infinite" }} /> مباشر الآن
          </div>
          <div style={{ fontSize:10, color:"#4A5468" }}>تحديث: ٠٩:٤٧ ص</div>
        </div>
      </div>

      {/* KPI STRIP */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, padding:"14px 20px", borderBottom:`1px solid rgba(255,255,255,0.04)` }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:10, padding:"10px 12px", borderBottom:`2px solid ${k.color}` }}>
            <div style={{ fontSize:10, color:"#6B7A94", marginBottom:4 }}>{k.label}</div>
            <div style={{ fontSize:22, fontWeight:900, color:k.color, lineHeight:1 }}>{k.val}</div>
            <div style={{ fontSize:10, color:"#4A5468", marginTop:3 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:16, padding:"16px 20px" }}>

        {/* LEFT */}
        <div>
          {/* Tabs */}
          <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
            {tabs.map(t => <button key={t.id} style={tabStyle(t.id)} onClick={() => setActiveTab(t.id)}>{t.label}</button>)}
          </div>

          {/* BUY TAB */}
          {activeTab === "buy" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, flexWrap:"wrap" }}>
                <span style={{ fontSize:13, fontWeight:700, color:GOLD }}>🛒 طلبات الشراء الحية</span>
                <span style={{ background:`${GOLD}18`, border:`1px solid ${GOLD}30`, borderRadius:15, padding:"2px 8px", fontSize:10, color:GOLD, fontWeight:700 }}>{filtered.length} طلب</span>
                <div style={{ marginRight:"auto", display:"flex", gap:5 }}>
                  {[["all","الكل"],["p1","عاجل"],["p2","عالي"],["p3","متوسط"]].map(([v,l]) => (
                    <button key={v} onClick={() => setFilterP(v)} style={{ border:"none", borderRadius:6, padding:"3px 9px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"Cairo,sans-serif", background: filterP===v ? GOLD : DARK4, color: filterP===v ? DARK : "#6B7A94" }}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{ maxHeight:580, overflowY:"auto", paddingLeft:2 }}>
                {filtered.map(l => <BuyCard key={l.rank} lead={l} />)}
              </div>
              <div style={{ textAlign:"center", marginTop:8, fontSize:10, color:"#4A5468" }}>اضغط على أي بطاقة لعرض التفاصيل الكاملة والتحليل وصيغة الرد</div>
            </div>
          )}

          {/* SELL TAB */}
          {activeTab === "sell" && (
            <div>
              <SellCard />
              <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                <div style={{ fontSize:13, fontWeight:700, color:GOLD, marginBottom:10 }}>📌 عقارات أخرى متاحة للبيع في الشروق</div>
                {[
                  { title:"فيلا منفصلة ٦٤٠م — الحي التاسع — ٣ شقق", price:"٨,٠٠٠,٠٠٠", note:"تصلح لسكن عائلي كبير أو استثمار تأجيري", url:"https://realestate.eg/ar/listings/sherouk?property_type=villa" },
                  { title:"تاون هاوس ١٦٠م كومباوند البروج — استلام فوري", price:"١٢,٣٠٠,٠٠٠", note:"مقدم ٥٪ فقط — تقسيط ٨ سنوات بدون فوائد", url:"https://www.newaqar.net/projects/al-burouj-compound/" },
                  { title:"شقة ١٤١م براديس الشروق — الترا سوبر لوكس", price:"قابل للتفاوض", note:"دور ثاني — فيو مفتوح — ٣ عدادات جاهزة", url:"https://www.semsarmasr.com/3akarat/3036900/" },
                  { title:"فيلا ٣٤٠م — تسليم فوري — حمام سباحة خاص", price:"٧,٩٩٩,٩٩٩", note:"الحي التاسع — تشطيب كامل — ٤ غرف", url:"https://realestate.eg/ar/listings/sherouk?property_type=villa" },
                ].map((p,i) => (
                  <div key={i} style={{ background:DARK4, borderRadius:9, padding:"9px 11px", marginBottom:7, display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:"#C8D0E0", marginBottom:2 }}>{p.title}</div>
                      <div style={{ fontSize:10, color:"#6B7A94" }}>{p.note}</div>
                    </div>
                    <div style={{ textAlign:"left", flexShrink:0 }}>
                      <div style={{ fontSize:12, fontWeight:800, color:GREEN }}>{p.price} ج</div>
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ fontSize:10, color:BLUE, textDecoration:"none" }}>🔗 المصدر</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEG TAB */}
          {activeTab === "neg" && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {/* Reply Templates */}
              {[
                { icon:"🏠", title:"الرد على المشتري الجاد (فيلا/كومباوند)", sub:"للمشترين ذوي الميزانية العالية والحاجة العاجلة", color:RED,
                  text:`أهلاً بك،\n\nبناءً على بحثك عن [نوع الوحدة] بمدينة الشروق، لدينا عرض حصري يناسب احتياجاتك تماماً:\n\n✅ [وصف الوحدة — المساحة والموقع]\n✅ السعر: [X مليون جنيه] — قابل للتفاوض المحدود\n✅ الاستلام: فوري / [مدة]\n✅ التمويل: مقدم [X٪] + تقسيط حتى [Y] سنة\n\nنرحب بمعاينة الوحدة في أي وقت. هل غداً مناسب لك؟` },
                { icon:"🌍", title:"الرد على المصري المقيم بالخارج", sub:"بالعربي والإنجليزي — للمعاملات عن بُعد", color:BLUE,
                  text:`Dear [Name],\n\nThank you for your interest in Shorouk City properties. We have an excellent unit matching your requirements:\n\n📍 [Unit description & location]\n💰 Price: [X] EGP (≈$XX,XXX)\n⚡ Immediate handover — fully finished\n📱 We handle the full process remotely: video tour, e-contract, digital payment\n\nAvailable for a video call at your convenience. When works best for you?` },
                { icon:"💼", title:"الرد على المستثمر الباحث عن عائد", sub:"للمستثمرين والمشترين للتأجير", color:GREEN,
                  text:`أخي المستثمر،\n\nالشروق من أعلى مناطق القاهرة في العائد الإيجاري لوجود:\n🎓 الجامعة البريطانية + مدارس دولية = طلب طلابي مرتفع\n🏥 المستشفيات الكبرى = طلب من الأطباء\n\nالوحدة المقترحة:\n[وصف الوحدة]\n💰 العائد الإيجاري المتوقع: ٨-١٢٪ سنوياً\n📈 ارتفاع متوسط السعر السنوي: ١٩٪\n\nالاستثمار الصحيح يبدأ بالتوقيت الصحيح — هل نحجز موعداً؟` },
              ].map((r,i) => (
                <div key={i} style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <div style={{ fontSize:20 }}>{r.icon}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:r.color }}>{r.title}</div>
                      <div style={{ fontSize:10, color:"#6B7A94" }}>{r.sub}</div>
                    </div>
                  </div>
                  <div style={{ background:DARK4, borderRadius:8, padding:"10px 12px", fontSize:11, lineHeight:1.8, color:"#8B95A8", borderRight:`3px solid ${r.color}`, whiteSpace:"pre-line" }}>{r.text}</div>
                </div>
              ))}

              {/* Negotiation Tips */}
              <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                <div style={{ fontSize:13, fontWeight:700, color:GOLD, marginBottom:10 }}>⚡ استراتيجيات التفاوض العقاري الذكي</div>
                {[
                  { num:1, color:BLUE, title:"الاتصال الأول — خلال ساعتين", text:"اتصل هاتفياً قبل أي رسالة. قل: «رأيت بحثك عن [الوحدة] — لدينا خيار مناسب جداً، متى نتحدث ١٠ دقائق؟» لا تذكر السعر في البداية." },
                  { num:2, color:ORANGE, title:"اكتشف الدافع الحقيقي", text:"اسأل: «ما الذي يجعل هذه المنطقة هي اختيارك؟» — الإجابة تخبرك ما الذي يهمه فعلاً: الموقع؟ المدرسة؟ العائد؟ ثم صمّم عرضك عليه." },
                  { num:3, color:GREEN, title:"الإلحاح الحقيقي", text:"«لدينا ٣ مشترين آخرين يعاينون الوحدة هذا الأسبوع — يمكنني حجزها لك ٤٨ ساعة بتأكيد جدي فقط.» الإلحاح الحقيقي أقوى من أي خصم." },
                  { num:4, color:PURPLE, title:"لا تتنازل عن السعر — تفاوض على القيمة", text:"بدلاً من خفض السعر: أضف خدمة، قلّل المقدم، مدد التقسيط. المشتري سيشعر بالفوز مع الاحتفاظ بهامش ربحك." },
                ].map(tip => (
                  <div key={tip.num} style={{ display:"flex", gap:10, alignItems:"flex-start", background:DARK4, borderRadius:8, padding:"8px 10px", marginBottom:7, borderRight:`3px solid ${tip.color}` }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:`${tip.color}20`, color:tip.color, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{tip.num}</div>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:"#C8D0E0", marginBottom:2 }}>{tip.title}</div>
                      <div style={{ fontSize:11, color:"#6B7A94", lineHeight:1.6 }}>{tip.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATS TAB */}
          {activeTab === "stats" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:12 }}>📊 توزيع الطلبات حسب النوع</div>
                <BarChart data={sectorData} />
              </div>
              <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:12 }}>💰 نطاقات الأسعار (مليون جنيه)</div>
                <BarChart data={[
                  { label:"< ٣م", val:20, color:BLUE },
                  { label:"٣-٦م", val:35, color:GREEN },
                  { label:"٦-١٢م", val:28, color:ORANGE },
                  { label:"> ١٢م", val:17, color:RED },
                ]} />
              </div>
              <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:12 }}>⏰ توزيع الإلحاح الزمني</div>
                <BarChart data={[
                  { label:"٧٢ ساعة", val:33, color:RED },
                  { label:"هذا الأسبوع", val:40, color:ORANGE },
                  { label:"هذا الشهر", val:20, color:GOLD },
                  { label:"مرن", val:7, color:BLUE },
                ]} />
              </div>
              <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:12 }}>🎯 احتمالات الإغلاق</div>
                <BarChart data={[
                  { label:"+٨٥٪", val:27, color:GREEN },
                  { label:"٧٠-٨٥٪", val:40, color:GOLD },
                  { label:"٥٥-٧٠٪", val:26, color:ORANGE },
                  { label:"< ٥٥٪", val:7, color:RED },
                ]} />
              </div>
              {/* Market Stats */}
              <div style={{ gridColumn:"1/-1", background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:12 }}>📈 مؤشرات سوق الشروق العقاري ٢٠٢٦</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                  {[
                    { label:"ارتفاع سنوي للأسعار", val:"١٩٪", color:GREEN, note:"معدل الزيادة السنوية" },
                    { label:"ارتفاع الطلب ٥ سنوات", val:"٤٤٪", color:BLUE, note:"على الفيلات تحديداً" },
                    { label:"متوسط سعر المتر", val:"٩-١٥K", color:GOLD, note:"جنيه حسب الحي والنوع" },
                    { label:"وحدات معروضة الآن", val:"+١٥٠٠", color:ORANGE, note:"عقارماب + عقار مصر" },
                  ].map((s,i) => (
                    <div key={i} style={{ background:DARK4, borderRadius:9, padding:"10px 12px", textAlign:"center" }}>
                      <div style={{ fontSize:11, color:"#6B7A94", marginBottom:4 }}>{s.label}</div>
                      <div style={{ fontSize:20, fontWeight:900, color:s.color, lineHeight:1 }}>{s.val}</div>
                      <div style={{ fontSize:9, color:"#4A5468", marginTop:3 }}>{s.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Best Sell Mini */}
          <div style={{ background:`linear-gradient(135deg,${GOLD}18,${GOLD}06)`, border:`1px solid ${GOLD}30`, borderRadius:12, padding:14 }}>
            <div style={{ fontSize:10, color:"#6B7A94", marginBottom:4 }}>🏆 أفضل فرصة بيع الآن</div>
            <div style={{ fontSize:13, fontWeight:800, color:GOLD, marginBottom:4 }}>فيلا مستقلة ٨٤١م — الحي التاسع</div>
            <div style={{ fontSize:20, fontWeight:900, color:GREEN }}>٨,٠٠٠,٠٠٠ ج</div>
            <div style={{ fontSize:10, color:"#6B7A94", marginBottom:8 }}>تسليم فوري | تشطيب كامل</div>
            <ScoreBar val={87} color={GREEN} label="الإغلاق" />
            <a href={sellOpportunity.url} target="_blank" rel="noreferrer" style={{ display:"block", marginTop:8, background:`linear-gradient(135deg,${GOLD},${GOLD}99)`, color:DARK, borderRadius:7, padding:"6px 0", fontSize:11, fontWeight:700, textDecoration:"none", textAlign:"center" }}>🔗 رابط المصدر</a>
          </div>

          {/* Top Compounds */}
          <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
            <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:10 }}>🏘️ أبرز الكومباوندات طلباً</div>
            {COMPS.map((c,i) => (
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                  <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize:12, fontWeight:700, color:BLUE, textDecoration:"none" }}>{c.name}</a>
                  <span style={{ fontSize:10, fontWeight:700, color:GREEN }}>{c.score}٪</span>
                </div>
                <div style={{ fontSize:10, color:"#6B7A94", marginBottom:3 }}>{c.desc}</div>
                <div style={{ height:4, background:DARK4, borderRadius:4 }}>
                  <div style={{ height:"100%", width:`${c.score}%`, background:`linear-gradient(90deg,${GOLD},${GREEN})`, borderRadius:4 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Sources */}
          <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
            <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:10 }}>🔗 مصادر البيانات</div>
            {[
              { name:"عقارماب", url:"https://aqarmap.com.eg/ar/for-sale/property-type/cairo/el-shorouk/compounds/", count:"+١٥٠٠ وحدة" },
              { name:"Property Finder", url:"https://www.propertyfinder.eg/en/buy/cairo/properties-for-sale-shorouk-city.html", count:"+١٢٩٠ شقة" },
              { name:"Dubizzle / OLX", url:"https://www.dubizzle.com.eg/properties/apartments-duplex-for-sale/shorouk-city/", count:"معروضات حية" },
              { name:"سمسار مصر", url:"https://www.semsarmasr.com/", count:"إعلانات مباشرة" },
              { name:"نيو عقار", url:"https://www.newaqar.net/projects/al-burouj-compound/", count:"البروج الشروق" },
              { name:"عقار مصر", url:"https://realestate.eg/ar/listings/sherouk?property_type=villa", count:"فيلات الشروق" },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:i<5?"1px solid rgba(255,255,255,0.04)":"none" }}>
                <a href={s.url} target="_blank" rel="noreferrer" style={{ fontSize:11, color:BLUE, textDecoration:"none" }}>{s.name}</a>
                <span style={{ fontSize:10, color:"#6B7A94" }}>{s.count}</span>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div style={{ background:DARK3, border:`1px solid rgba(255,255,255,0.05)`, borderRadius:12, padding:14 }}>
            <div style={{ fontSize:12, fontWeight:700, color:GOLD, marginBottom:10 }}>💡 نصائح سريعة</div>
            {[
              { icon:"⚡", text:"الطلبات ذات الأولوية ١ تنتهي خلال ٧٢ ساعة — تصرف الآن" },
              { icon:"📱", text:"واتساب أسرع من الإيميل مع المصريين المقيمين بالخارج" },
              { icon:"🏦", text:"اذكر شروط التمويل البنكي فوراً — يسرّع القرار بـ٤٠٪" },
              { icon:"📸", text:"أرسل فيديو للوحدة قبل طلب المعاينة — يرفع الاهتمام" },
            ].map((t,i) => (
              <div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start", marginBottom:7 }}>
                <span style={{ fontSize:14 }}>{t.icon}</span>
                <span style={{ fontSize:11, color:"#6B7A94", lineHeight:1.5 }}>{t.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
