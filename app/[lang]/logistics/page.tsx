"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Inter, Cairo } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'] });

// 1. القاموس (تم إضافة نصوص الفوتر وتحديثها)
const dictionaries = {
  en: {
    dir: "ltr",
    navHome: "Home", navSupplier: "For Suppliers", navBuyer: "For Buyers", navLog: "Logistics", switchLang: "عربي", switchLink: "/ar/logistics",
    title: "Join laxOEM Logistics Network",
    desc: "We welcome applications from shipping companies clearance agencies and warehousing providers to build strong operational partnerships within the supply ecosystem.",
    sec1: "1. Company Details",
    company: "Company Name *", country: "Headquarters Country *", city: "City *", years: "Years of Experience",
    sec2: "2. Services and Operations",
    servicesLabel: "Type of Service Provided (Select multiple):",
    services: ['Sea Freight', 'Air Freight', 'Customs Clearance', 'Warehousing', 'Integrated Logistics'],
    regions: "Operating Countries / Regions", regionsDesc: "Example: China UAE Sudan",
    routes: "Main Shipping Routes", routesDesc: "Example: Guangzhou to Port Sudan",
    sec3: "3. Contact Information",
    person: "Contact Person *", email: "Official Email *", phone: "Phone Number *", whatsapp: "WhatsApp Number",
    submitBtn: "Submit Partnership Request",
    sending: "Sending...",
    success: "✅ Partnership request received successfully We will contact you soon.",
    error: "❌ Error submitting Please check your connection.",
    // نصوص الفوتر
    footerDesc: "Connecting global suppliers to Sudan markets the gateway to Africa",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    footerEmail: "Email: partners@laxoem.com",
    rights: "© 2026 laxOEM. All rights reserved."
  },
  ar: {
    dir: "rtl",
    navHome: "الرئيسية", navSupplier: "للموردين", navBuyer: "للتجار", navLog: "شريك لوجستي", switchLang: "English", switchLink: "/en/logistics",
    title: "انضم كشريك لوجستي في laxOEM",
    desc: "نستقبل طلبات شركات الشحن التخليص والتخزين لبناء شراكات تشغيلية قوية داخل منظومة التوريد.",
    sec1: "1. بيانات الشركة",
    company: "اسم الشركة *", country: "الدولة (المقر الرئيسي) *", city: "المدينة *", years: "سنوات الخبرة في المجال",
    sec2: "2. الخدمات ومناطق العمل",
    servicesLabel: "نوع الخدمة المقدمة (يمكنك اختيار أكثر من واحدة):",
    services: ['شحن بحري', 'شحن جوي', 'تخليص جمركي', 'تخزين', 'خدمات لوجستية متكاملة'],
    regions: "الدول التي تعملون فيها", regionsDesc: "مثال: الصين الإمارات السودان",
    routes: "خطوط الشحن الرئيسية (إن وجدت)", routesDesc: "مثال: جوانزو إلى بورتسودان",
    sec3: "3. معلومات التواصل",
    person: "اسم الشخص المسؤول *", email: "البريد الإلكتروني الرسمي *", phone: "رقم الهاتف (للاتصال) *", whatsapp: "رقم واتساب",
    submitBtn: "إرسال طلب الشراكة اللوجستية",
    sending: "جاري إرسال الطلب...",
    success: "✅ تم استلام طلب الشراكة بنجاح سيتم التواصل معكم قريباً.",
    error: "❌ حدث خطأ أثناء الإرسال تأكد من اتصالك بالإنترنت.",
    // نصوص الفوتر
    footerDesc: "ربط الموردين العالميين بأسواق السودان بوابة أفريقيا",
    quickLinks: "روابط سريعة",
    contactUs: "تواصل معنا",
    footerEmail: "البريد الإلكتروني: partners@laxoem.com",
    rights: "© 2026 laxOEM. جميع الحقوق محفوظة."
  }
};

export default function LogisticsApplication() {
  const params = useParams();
  const lang = (params.lang as keyof typeof dictionaries) || "en";
  const t = dictionaries[lang];

  const [formData, setFormData] = useState({
    company_name: "", country: "", city: "", years_in_experience: "",
    operating_regions: "", main_routes: "", email: "", contact_person: "",
    phone: "", whatsapp: ""
  });
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices(selectedServices.filter((service) => service !== value));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus(t.sending);

    const { error } = await supabase.from("logistics_partners").insert([{
      company_name: formData.company_name, country: formData.country, city: formData.city, service_type: selectedServices, years_in_experience: parseInt(formData.years_in_experience) || 0, operating_regions: formData.operating_regions, main_routes: formData.main_routes, email: formData.email, contact_person: formData.contact_person, phone: formData.phone, whatsapp: formData.whatsapp,
    }]);

    if (error) {
      console.error(error);
      setStatus(t.error);
    } else {
      setStatus(t.success);
      setFormData({ company_name: "", country: "", city: "", years_in_experience: "", operating_regions: "", main_routes: "", email: "", contact_person: "", phone: "", whatsapp: "" });
      setSelectedServices([]);
    }
  };

  return (
    <main dir={t.dir} className={`min-h-screen bg-gray-100 flex flex-col ${t.dir === 'rtl' ? cairo.className : inter.className}`}>
      
      {/* الشريط العلوي */}
      <header className="w-full bg-white shadow-md border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center z-50 sticky top-0">
        <Link href={`/${lang}`} className="text-3xl md:text-4xl font-black tracking-tighter">
          <span className="text-blue-800">lax</span>
          <span className="text-orange-500">OEM</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 font-semibold text-gray-600">
            <Link href={`/${lang}`} className="hover:text-orange-600 transition-colors">{t.navHome}</Link>
            <Link href={`/${lang}/supplier`} className="hover:text-orange-600 transition-colors">{t.navSupplier}</Link>
            <Link href={`/${lang}/buyer`} className="hover:text-orange-600 transition-colors">{t.navBuyer}</Link>
          </nav>
          <Link href={t.switchLink} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors text-sm border border-gray-200 shadow-sm">
            {t.switchLang} 🌐
          </Link>
        </div>
      </header>

      {/* الصورة العلوية (تم تعديل المسافات لتناسب الجوال) */}
      <section className="relative w-full min-h-[20rem] md:min-h-[24rem] bg-cover bg-center flex flex-col items-center justify-center py-12 md:py-20" style={{ backgroundImage: "url('/images/logistics-bg.jpg')" }}>
        <div className="absolute inset-0 bg-orange-900/85 z-0"></div>
        <div className="relative z-10 text-center px-4 mt-4 pb-12 md:pb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.title}</h1>
          <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md leading-relaxed">{t.desc}</p>
        </div>
      </section>

      {/* محتوى الفورمة (تم تقليل التداخل في الجوال) */}
      <div className="flex-grow flex items-start justify-center p-4 md:p-6 relative z-20 -mt-16 md:-mt-28 mb-12 w-full">
        <div className="max-w-4xl w-full bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8 mt-2">
            
            {/* القسم 1 */}
            <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
              <h2 className="text-xl font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2">{t.sec1}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">{t.company}</label>
                  <input required type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.country}</label>
                  <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.city}</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">{t.years}</label>
                  <input type="number" name="years_in_experience" value={formData.years_in_experience} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
              </div>
            </div>

            {/* القسم 2 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{t.sec2}</h2>
              <label className="block text-gray-700 font-semibold mb-3">{t.servicesLabel}</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {t.services.map((service) => (
                  <label key={service} className={`flex items-center space-x-2 ${t.dir === 'rtl' ? 'space-x-reverse' : ''} cursor-pointer`}>
                    <input type="checkbox" value={service} checked={selectedServices.includes(service)} onChange={handleServiceChange} className="w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                    <span className="text-gray-700 font-medium">{service}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.regions}</label>
                  <input type="text" name="operating_regions" value={formData.operating_regions} onChange={handleChange} placeholder={t.regionsDesc} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.routes}</label>
                  <input type="text" name="main_routes" value={formData.main_routes} onChange={handleChange} placeholder={t.routesDesc} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
              </div>
            </div>

            {/* القسم 3 */}
            <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
              <h2 className="text-xl font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2">{t.sec3}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.person}</label>
                  <input required type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.email}</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" dir="ltr" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.phone}</label>
                  <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" dir="ltr" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.whatsapp}</label>
                  <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" dir="ltr" />
                </div>
              </div>
            </div>

            {status && (
              <div className={`p-4 rounded-lg font-bold text-center ${status.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' : status.includes('❌') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-blue-50 text-blue-800'}`}>
                {status}
              </div>
            )}

            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xl py-5 rounded-xl transition-all shadow-lg mt-6">
              {t.submitBtn}
            </button>
          </form>
        </div>
      </div>

      {/* التذييل (Footer) المزروع جديد */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* العمود الأول: الشعار والوصف */}
          <div>
            <Link href={`/${lang}`} className="text-3xl font-black tracking-tighter mb-4 inline-block">
              <span className="text-white">lax</span>
              <span className="text-orange-500">OEM</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mt-2 max-w-sm">
              {t.footerDesc}
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="text-white font-bold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}`} className="hover:text-orange-400 transition-colors">{t.navHome}</Link></li>
              <li><Link href={`/${lang}/supplier`} className="hover:text-orange-400 transition-colors">{t.navSupplier}</Link></li>
              <li><Link href={`/${lang}/buyer`} className="hover:text-orange-400 transition-colors">{t.navBuyer}</Link></li>
              <li><Link href={`/${lang}/logistics`} className="hover:text-orange-400 transition-colors">{t.navLog}</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: معلومات التواصل */}
          <div>
            <h4 className="text-white font-bold mb-4">{t.contactUs}</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <span>✉️</span> <a href="mailto:partners@laxoem.com" className="hover:text-orange-400 transition-colors">{t.footerEmail}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* خط النهاية والحقوق */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
          {t.rights}
        </div>
      </footer>
    </main>
  );
}