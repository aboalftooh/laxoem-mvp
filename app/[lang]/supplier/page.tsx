"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Inter, Cairo } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'] });

// 1. القاموس (تم مسح جميع الفواصل ليكون النص انسيابياً واحترافياً)
const dictionaries = {
  en: {
    dir: "ltr",
    navHome: "Home", navBuyer: "For Buyers", navLog: "Logistics", switchLang: "عربي", switchLink: "/ar/supplier",
    title: "Join laxOEM Supplier Network",
    desc: "We welcome applications from manufacturers brand agents and distributors seeking to build direct sourcing relationships with the African market.",
    sec1: "1. Basic Information",
    company: "Company Name / Manufacturer *",
    bizType: "Business Type *", type1: "Manufacturer", type2: "Brand Agent", type3: "Distributor",
    country: "Country *", city: "City *", years: "Years in Business",
    sec2: "2. Contact Information",
    person: "Contact Person *", email: "Official Email *", whatsapp: "WhatsApp Number", wechat: "WeChat ID", url: "Website or Alibaba Link",
    sec3: "3. Market Experience (Optional)",
    expSudan: "Experience with Sudan?", expAfrica: "Experience with Africa?", yes: "Yes", no: "No",
    expDesc: "How was your previous experience?",
    challenges: "Expansion challenges in Africa?",
    submitBtn: "Submit Application",
    sending: "Sending...",
    success: "✅ Application received successfully We will review and contact you.",
    error: "❌ Error submitting Please check your connection."
  },
  ar: {
    dir: "rtl",
    navHome: "الرئيسية", navBuyer: "للتجار", navLog: "شريك لوجستي", switchLang: "English", switchLink: "/en/supplier",
    title: "انضم إلى شبكة موردي laxOEM",
    desc: "نستقبل طلبات المصانع وكلاء البراندات والموزعين لبناء قنوات توريد مباشرة ومنظمة مع الأسواق الأفريقية.",
    sec1: "1. البيانات الأساسية",
    company: "اسم الشركة / المصنع *",
    bizType: "الصفة التجارية *", type1: "مصنع", type2: "وكيل براند", type3: "موزع",
    country: "الدولة *", city: "المدينة *", years: "عدد سنوات النشاط التجاري",
    sec2: "2. معلومات التواصل",
    person: "اسم الشخص المسؤول *", email: "البريد الإلكتروني الرسمي *", whatsapp: "رقم واتساب (WhatsApp)", wechat: "معرف وي تشات (WeChat ID)", url: "رابط الموقع أو صفحة Alibaba",
    sec3: "3. الخبرة السوقية (إختياري)",
    expSudan: "هل سبق لكم التعامل مع السودان؟", expAfrica: "هل سبق لكم التعامل مع أفريقيا؟", yes: "نعم", no: "لا",
    expDesc: "كيف كانت تجربتكم السابقة؟ (إن وجدت)",
    challenges: "ما هي التحديات التي تواجهكم في التوسع في أفريقيا؟",
    submitBtn: "إرسال طلب الانضمام",
    sending: "جاري إرسال الطلب...",
    success: "✅ تم استلام طلبكم بنجاح سيتم مراجعة البيانات والتواصل معكم.",
    error: "❌ حدث خطأ أثناء الإرسال تأكد من اتصالك بالإنترنت."
  }
};

export default function SupplierApplication() {
  const params = useParams();
  const lang = (params.lang as keyof typeof dictionaries) || "en";
  const t = dictionaries[lang];

  const [formData, setFormData] = useState({
    company_name: "", country: "", city: "", business_type: t.type1, website_url: "", email: "", contact_person: "", whatsapp: "", wechat_id: "", experience_sudan: t.no, experience_africa: t.no, market_experience_desc: "", expansion_challenges: "", years_in_business: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus(t.sending);
    const { error } = await supabase.from("suppliers").insert([{
        company_name: formData.company_name, country: formData.country, city: formData.city, business_type: formData.business_type, website_url: formData.website_url, email: formData.email, contact_person: formData.contact_person, whatsapp: formData.whatsapp, wechat_id: formData.wechat_id, experience_sudan: formData.experience_sudan === t.yes, experience_africa: formData.experience_africa === t.yes, market_experience_desc: formData.market_experience_desc, expansion_challenges: formData.expansion_challenges, years_in_business: parseInt(formData.years_in_business) || 0,
    }]);

    if (error) {
      console.error(error);
      setStatus(t.error);
    } else {
      setStatus(t.success);
      setFormData({ company_name: "", country: "", city: "", business_type: t.type1, website_url: "", email: "", contact_person: "", whatsapp: "", wechat_id: "", experience_sudan: t.no, experience_africa: t.no, market_experience_desc: "", expansion_challenges: "", years_in_business: "" });
    }
  };

  return (
    <main dir={t.dir} className={`min-h-screen bg-gray-100 flex flex-col ${t.dir === 'rtl' ? cairo.className : inter.className}`}>
      
      {/* الشريط العلوي (Navbar) */}
      <header className="w-full bg-white shadow-md border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center z-50 sticky top-0">
        <Link href={`/${lang}`} className="text-3xl md:text-4xl font-black tracking-tighter">
          <span className="text-blue-800">lax</span>
          <span className="text-orange-500">OEM</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 font-semibold text-gray-600">
            <Link href={`/${lang}`} className="hover:text-blue-700 transition-colors">{t.navHome}</Link>
            <Link href={`/${lang}/buyer`} className="hover:text-blue-700 transition-colors">{t.navBuyer}</Link>
            <Link href={`/${lang}/logistics`} className="hover:text-blue-700 transition-colors">{t.navLog}</Link>
          </nav>
          <Link href={t.switchLink} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors text-sm border border-gray-200 shadow-sm">
            {t.switchLang} 🌐
          </Link>
        </div>
      </header>

      {/* قسم الصورة العلوية */}
      <section className="relative w-full h-72 md:h-96 bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/images/supplier-bg.jpg')" }}>
        <div className="absolute inset-0 bg-blue-900/80 z-0"></div>
        <div className="relative z-10 text-center px-4 mt-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.title}</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">{t.desc}</p>
        </div>
      </section>

      {/* محتوى الصفحة والفورمة */}
      <div className="flex-grow flex items-start justify-center p-4 md:p-6 relative z-20 -mt-20 md:-mt-28 mb-12 w-full">
        <div className="max-w-4xl w-full bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8 mt-2">
            
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2">{t.sec1}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.company}</label>
                  <input required type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.bizType}</label>
                  <select name="business_type" value={formData.business_type} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value={t.type1}>{t.type1}</option>
                    <option value={t.type2}>{t.type2}</option>
                    <option value={t.type3}>{t.type3}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.country}</label>
                  <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.city}</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">{t.years}</label>
                  <input type="number" name="years_in_business" value={formData.years_in_business} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
              <h2 className="text-xl font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2">{t.sec2}</h2>
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
                  <label className="block text-gray-700 font-semibold mb-2">{t.whatsapp}</label>
                  <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" dir="ltr" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.wechat}</label>
                  <input type="text" name="wechat_id" value={formData.wechat_id} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" dir="ltr" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">{t.url}</label>
                  <input type="url" name="website_url" value={formData.website_url} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" dir="ltr" placeholder="https://" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{t.sec3}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.expSudan}</label>
                  <select name="experience_sudan" value={formData.experience_sudan} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg outline-none bg-white">
                    <option value={t.no}>{t.no}</option>
                    <option value={t.yes}>{t.yes}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.expAfrica}</label>
                  <select name="experience_africa" value={formData.experience_africa} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg outline-none bg-white">
                    <option value={t.no}>{t.no}</option>
                    <option value={t.yes}>{t.yes}</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.expDesc}</label>
                  <textarea name="market_experience_desc" value={formData.market_experience_desc} onChange={handleChange} rows={3} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.challenges}</label>
                  <textarea name="expansion_challenges" value={formData.expansion_challenges} onChange={handleChange} rows={3} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
              </div>
            </div>

            {status && (
              <div className={`p-4 rounded-lg font-bold text-center ${status.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' : status.includes('❌') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-blue-50 text-blue-800'}`}>
                {status}
              </div>
            )}

            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xl py-5 rounded-xl transition-all shadow-lg mt-6">
              {t.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}