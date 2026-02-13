import Link from 'next/link';
import { Inter, Cairo } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'] });

// 1. القاموس (تم تحديث الوصف وحذف اللوكيشن)
const dictionaries = {
  en: {
    dir: "ltr",
    title: "Digital Supply Network for Auto Parts",
    desc: "We connect suppliers and brands in Asian markets directly with auto parts traders in Sudan through a data-driven relationship-based and professionally organized sourcing model.",
    founderText: "We are currently accepting applications from founding partners to build a trusted supply network.",
    supplierBtn: "Become a Supplier",
    buyerBtn: "Become a Buyer",
    logBtn: "Logistics Partner",
    trustTitle: "Why join the laxOEM network?",
    trust1: "Verified Data",
    trust2: "Trusted Partners",
    trust3: "Direct Relations",
    trust4: "Structured Trade",
    navHome: "Home",
    navSupplier: "For Suppliers",
    navBuyer: "For Buyers",
    navLogistics: "Logistics",
    switchLang: "عربي",
    switchLink: "/ar",
    // التعديلات الجديدة في الفوتر للإنجليزي
    footerDesc: "Connecting global suppliers to Sudan markets the gateway to Africa",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    email: "Email: partners@laxoem.com",
    rights: "© 2026 laxOEM. All rights reserved."
  },
  ar: {
    dir: "rtl",
    title: "شبكة توريد رقمية لقطاع قطع الغيار",
    desc: "نربط الموردين والبراندات في الأسواق الآسيوية مباشرة مع تجار قطع الغيار في السودان عبر نموذج يعتمد على البيانات العلاقات المباشرة والتنظيم التجاري الاحترافي.",
    founderText: "نستقبل الآن طلبات الانضمام للشركاء المؤسسين لبناء شبكة توريد موثوقة وقابلة للنمو.",
    supplierBtn: "انضم كمورد",
    buyerBtn: "انضم كتاجر",
    logBtn: "شريك لوجستي",
    trustTitle: "لماذا تنضم لشبكة laxOEM؟",
    trust1: "بيانات حقيقية",
    trust2: "شركاء موثقين",
    trust3: "علاقات مباشرة",
    trust4: "تنظيم تجاري",
    navHome: "الرئيسية",
    navSupplier: "للموردين",
    navBuyer: "للتجار",
    navLogistics: "شريك لوجستي",
    switchLang: "English",
    switchLink: "/en",
    // التعديلات الجديدة في الفوتر للعربي
    footerDesc: "ربط الموردين العالميين بأسواق السودان بوابة أفريقيا",
    quickLinks: "روابط سريعة",
    contactUs: "تواصل معنا",
    email: "البريد الإلكتروني: partners@laxoem.com",
    rights: "© 2026 laxOEM. جميع الحقوق محفوظة."
  }
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as keyof typeof dictionaries;
  const t = dictionaries[lang] || dictionaries.en;

  return (
    <main dir={t.dir} className={`flex flex-col min-h-screen bg-gray-50 ${t.dir === 'rtl' ? cairo.className : inter.className}`}>
      
      {/* الشريط العلوي */}
      <header className="w-full bg-white shadow-sm border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center z-50">
        <Link href={`/${lang}`} className="text-3xl md:text-4xl font-black tracking-tighter">
          <span className="text-blue-800">lax</span>
          <span className="text-orange-500">OEM</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 font-semibold text-gray-600">
            <Link href={`/${lang}`} className="hover:text-blue-700 transition-colors">{t.navHome}</Link>
            <Link href={`/${lang}/supplier`} className="hover:text-blue-700 transition-colors">{t.navSupplier}</Link>
            <Link href={`/${lang}/buyer`} className="hover:text-blue-700 transition-colors">{t.navBuyer}</Link>
          </nav>
          <Link href={t.switchLink} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors text-sm border border-gray-200 shadow-sm">
            {t.switchLang} 🌐
          </Link>
        </div>
      </header>

      {/* القسم الرئيسي */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-slate-900/75 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto w-full mt-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">{t.title}</h1>
          <p className="text-lg md:text-2xl text-gray-200 leading-relaxed mb-4 drop-shadow-md">{t.desc}</p>
          <p className="text-md md:text-lg font-semibold text-blue-300 mb-8 drop-shadow-md">{t.founderText}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <Link href={`/${lang}/supplier`} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl text-lg border border-blue-400">{t.supplierBtn}</Link>
            <Link href={`/${lang}/buyer`} className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl text-lg border border-green-400">{t.buyerBtn}</Link>
            <Link href={`/${lang}/logistics`} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl text-lg border border-orange-400">{t.logBtn}</Link>
          </div>
        </div>
      </section>

      {/* قسم الثقة */}
      <section className="py-16 px-6 flex-grow flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t.trustTitle}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 font-semibold text-center">
            <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
              <span className="text-4xl">📊</span> {t.trust1}
            </li>
            <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
              <span className="text-4xl">🤝</span> {t.trust2}
            </li>
            <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
              <span className="text-4xl">🔗</span> {t.trust3}
            </li>
            <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
              <span className="text-4xl">⚙️</span> {t.trust4}
            </li>
          </ul>
        </div>
      </section>

      {/* التذييل (Footer) */}
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
              <li><Link href={`/${lang}`} className="hover:text-blue-400 transition-colors">{t.navHome}</Link></li>
              <li><Link href={`/${lang}/supplier`} className="hover:text-blue-400 transition-colors">{t.navSupplier}</Link></li>
              <li><Link href={`/${lang}/buyer`} className="hover:text-blue-400 transition-colors">{t.navBuyer}</Link></li>
              <li><Link href={`/${lang}/logistics`} className="hover:text-blue-400 transition-colors">{t.navLogistics}</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: معلومات التواصل (تم حذف اللوكيشن) */}
          <div>
            <h4 className="text-white font-bold mb-4">{t.contactUs}</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <span>✉️</span> <a href="mailto:partners@laxoem.com" className="hover:text-blue-400 transition-colors">{t.email}</a>
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