"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Inter, Cairo } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'] });

// 1. القاموس (النصوص نظيفة بدون فواصل)
const dictionaries = {
  en: {
    dir: "ltr",
    navHome: "Home", navSupplier: "For Suppliers", navLog: "Logistics", switchLang: "عربي", switchLink: "/ar/buyer",
    title: "Join laxOEM Buyer Network",
    desc: "A dedicated network for auto parts traders seeking to build overseas sourcing relationships through a structured and data-driven channel.",
    sec1: "1. Store / Company Details",
    storeName: "Store / Company Name *", country: "Country *", city: "City *", years: "Years in Business", branches: "Number of Branches",
    sec2: "2. Business Activity",
    brandsLabel: "Vehicle brands you work with (Select multiple):",
    brands: ['Toyota', 'Nissan', 'Hyundai', 'Kia', 'Mitsubishi', 'Other'],
    url: "Website or Facebook Page Link",
    sec3: "3. Import Experience & Contact",
    whatsapp: "WhatsApp Number *", email: "Email Address",
    expImport: "Do you have prior importing experience?", yes: "Yes", no: "No",
    challenges: "What are your main importing challenges?",
    submitBtn: "Submit Application",
    sending: "Sending...",
    success: "✅ Application received successfully We will review and contact you.",
    error: "❌ Error submitting Please check your connection."
  },
  ar: {
    dir: "rtl",
    navHome: "الرئيسية", navSupplier: "للموردين", navLog: "شريك لوجستي", switchLang: "English", switchLink: "/en/buyer",
    title: "انضم إلى شبكة تجار laxOEM",
    desc: "شبكة مخصصة لتجار قطع الغيار الراغبين في بناء علاقات توريد خارجية عبر قناة منظمة وقائمة على بيانات حقيقية.",
    sec1: "1. بيانات المحل / الشركة",
    storeName: "اسم المحل / الشركة *", country: "الدولة *", city: "المدينة *", years: "عدد سنوات العمل", branches: "عدد الفروع",
    sec2: "2. النشاط التجاري",
    brandsLabel: "السيارات التي تعمل فيها (يمكنك اختيار أكثر من واحدة):",
    brands: ['تويوتا', 'نيسان', 'هيونداي', 'كيا', 'ميتسوبيشي', 'أخرى'],
    url: "رابط الموقع أو صفحة فيسبوك",
    sec3: "3. الاستيراد والتواصل",
    whatsapp: "رقم الهاتف (واتساب) *", email: "البريد الإلكتروني",
    expImport: "هل سبق لكم التوريد من الخارج؟", yes: "نعم", no: "لا",
    challenges: "ما هي التحديات التي تواجهكم في الاستيراد؟",
    submitBtn: "إرسال طلب الانضمام",
    sending: "جاري إرسال الطلب...",
    success: "✅ تم استلام طلبكم بنجاح سيتم مراجعة البيانات والتواصل معكم.",
    error: "❌ حدث خطأ أثناء الإرسال تأكد من اتصالك بالإنترنت."
  }
};

export default function BuyerApplication() {
  const params = useParams();
  const lang = (params.lang as keyof typeof dictionaries) || "en";
  const t = dictionaries[lang];

  const [formData, setFormData] = useState({
    store_name: "", country: "", city: "", website_or_social_url: "",
    phone_number: "", email: "", import_experience: t.no, import_challenges: "",
    years_in_business: "", number_of_branches: "1"
  });
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBrandChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedBrands([...selectedBrands, value]);
    } else {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus(t.sending);

    const { error } = await supabase.from("buyers").insert([{
      store_name: formData.store_name, country: formData.country, city: formData.city, website_or_social_url: formData.website_or_social_url, vehicle_brands: selectedBrands, phone_number: formData.phone_number, email: formData.email, import_experience: formData.import_experience === t.yes, import_challenges: formData.import_challenges, years_in_business: parseInt(formData.years_in_business) || 0, number_of_branches: parseInt(formData.number_of_branches) || 1,
    }]);

    if (error) {
      console.error(error);
      setStatus(t.error);
    } else {
      setStatus(t.success);
      setFormData({ store_name: "", country: "", city: "", website_or_social_url: "", phone_number: "", email: "", import_experience: t.no, import_challenges: "", years_in_business: "", number_of_branches: "1" });
      setSelectedBrands([]);
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
            <Link href={`/${lang}`} className="hover:text-green-700 transition-colors">{t.navHome}</Link>
            <Link href={`/${lang}/supplier`} className="hover:text-green-700 transition-colors">{t.navSupplier}</Link>
            <Link href={`/${lang}/logistics`} className="hover:text-green-700 transition-colors">{t.navLog}</Link>
          </nav>
          <Link href={t.switchLink} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors text-sm border border-gray-200 shadow-sm">
            {t.switchLang} 🌐
          </Link>
        </div>
      </header>

      {/* الصورة العلوية (البانر الأخضر) */}
      <section className="relative w-full h-72 md:h-96 bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('/images/buyer-bg.jpg')" }}>
        <div className="absolute inset-0 bg-emerald-900/80 z-0"></div>
        <div className="relative z-10 text-center px-4 mt-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.title}</h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">{t.desc}</p>
        </div>
      </section>

      {/* محتوى الفورمة */}
      <div className="flex-grow flex items-start justify-center p-4 md:p-6 relative z-20 -mt-20 md:-mt-28 mb-12 w-full">
        <div className="max-w-4xl w-full bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8 mt-2">
            
            {/* القسم 1 */}
            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
              <h2 className="text-xl font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">{t.sec1}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">{t.storeName}</label>
                  <input required type="text" name="store_name" value={formData.store_name} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.country}</label>
                  <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.city}</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.years}</label>
                  <input type="number" name="years_in_business" value={formData.years_in_business} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.branches}</label>
                  <input type="number" name="number_of_branches" value={formData.number_of_branches} onChange={handleChange} min="1" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
            </div>

            {/* القسم 2 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{t.sec2}</h2>
              <label className="block text-gray-700 font-semibold mb-3">{t.brandsLabel}</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {t.brands.map((brand) => (
                  <label key={brand} className={`flex items-center space-x-2 ${t.dir === 'rtl' ? 'space-x-reverse' : ''} cursor-pointer`}>
                    <input type="checkbox" value={brand} checked={selectedBrands.includes(brand)} onChange={handleBrandChange} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                    <span className="text-gray-700 font-medium">{brand}</span>
                  </label>
                ))}
              </div>
              <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">{t.url}</label>
                  <input type="url" name="website_or_social_url" value={formData.website_or_social_url} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" dir="ltr" placeholder="https://" />
              </div>
            </div>

            {/* القسم 3 */}
            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
              <h2 className="text-xl font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">{t.sec3}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.whatsapp}</label>
                  <input required type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" dir="ltr" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" dir="ltr" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">{t.expImport}</label>
                  <select name="import_experience" value={formData.import_experience} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                    <option value={t.no}>{t.no}</option>
                    <option value={t.yes}>{t.yes}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.challenges}</label>
                <textarea name="import_challenges" value={formData.import_challenges} onChange={handleChange} rows={3} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
              </div>
            </div>

            {status && (
              <div className={`p-4 rounded-lg font-bold text-center ${status.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' : status.includes('❌') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-blue-50 text-blue-800'}`}>
                {status}
              </div>
            )}

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xl py-5 rounded-xl transition-all shadow-lg mt-6">
              {t.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}