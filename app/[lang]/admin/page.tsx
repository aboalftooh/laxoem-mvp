"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic'] });

export default function AdminDashboard() {
  // حالات تسجيل الدخول والبيانات
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("suppliers"); // suppliers | buyers | logistics_partners
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // دالة تسجيل الدخول (كلمة المرور المؤقتة للـ MVP هي: lax2026)
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === "lax2026") {
      setIsAuthenticated(true);
    } else {
      alert("❌ كلمة المرور غير صحيحة!");
    }
  };

  // جلب البيانات من Supabase بناءً على التاب النشط
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    // جلب البيانات وترتيبها من الأحدث للأقدم
    const { data, error } = await supabase
      .from(activeTab)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setRecords(data || []);
    }
    setLoading(false);
  };

  // شاشة تسجيل الدخول (لو لسه ما دخلش الباسورد)
  if (!isAuthenticated) {
    return (
      <div dir="rtl" className={`min-h-screen flex items-center justify-center bg-gray-100 ${cairo.className}`}>
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-200">
          <h1 className="text-3xl font-black mb-2">
            <span className="text-blue-800">lax</span><span className="text-orange-500">OEM</span>
          </h1>
          <p className="text-gray-500 mb-8 font-semibold">لوحة تحكم الإدارة</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="أدخل كلمة المرور..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center text-xl tracking-widest"
              dir="ltr"
            />
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md">
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  // لوحة التحكم الأساسية (بعد تسجيل الدخول)
  return (
    <div dir="rtl" className={`min-h-screen bg-gray-50 flex flex-col ${cairo.className}`}>
      
      {/* الشريط العلوي للوحة التحكم */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
        <div className="text-2xl font-black">
          <span>lax</span><span className="text-orange-500">OEM</span> <span className="text-slate-400 text-lg font-semibold ml-2">| الإدارة</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
          تسجيل خروج
        </button>
      </header>

      {/* أزرار التنقل بين الأقسام */}
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <button onClick={() => setActiveTab("suppliers")} className={`px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${activeTab === "suppliers" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>
            🏭 الموردين ({activeTab === "suppliers" ? records.length : '...'})
          </button>
          <button onClick={() => setActiveTab("buyers")} className={`px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${activeTab === "buyers" ? "bg-green-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>
            🛒 التجار ({activeTab === "buyers" ? records.length : '...'})
          </button>
          <button onClick={() => setActiveTab("logistics_partners")} className={`px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${activeTab === "logistics_partners" ? "bg-orange-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>
            🚚 شركاء اللوجستيات ({activeTab === "logistics_partners" ? records.length : '...'})
          </button>
        </div>

        {/* عرض البيانات في جدول */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 font-bold text-lg">جاري تحميل البيانات... ⏳</div>
          ) : records.length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-bold text-lg">لا توجد بيانات مسجلة في هذا القسم حتى الآن.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm text-gray-600">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">التاريخ</th>
                    {activeTab === "suppliers" && <><th className="px-6 py-4">الشركة/المصنع</th><th className="px-6 py-4">الدولة</th><th className="px-6 py-4">الصفة</th><th className="px-6 py-4">المسؤول</th><th className="px-6 py-4">واتساب</th><th className="px-6 py-4">السودان؟</th></>}
                    {activeTab === "buyers" && <><th className="px-6 py-4">المحل/الشركة</th><th className="px-6 py-4">المدينة</th><th className="px-6 py-4">السيارات</th><th className="px-6 py-4">واتساب</th><th className="px-6 py-4">خبرة استيراد؟</th></>}
                    {activeTab === "logistics_partners" && <><th className="px-6 py-4">الشركة</th><th className="px-6 py-4">الخدمات</th><th className="px-6 py-4">مناطق العمل</th><th className="px-6 py-4">واتساب</th></>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900" dir="ltr">{new Date(record.created_at).toLocaleDateString()}</td>
                      
                      {activeTab === "suppliers" && (
                        <>
                          <td className="px-6 py-4 font-bold text-blue-700">{record.company_name}</td>
                          <td className="px-6 py-4">{record.country}</td>
                          <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{record.business_type}</span></td>
                          <td className="px-6 py-4">{record.contact_person}</td>
                          <td className="px-6 py-4" dir="ltr">{record.whatsapp}</td>
                          <td className="px-6 py-4">{record.experience_sudan ? "✅ نعم" : "❌ لا"}</td>
                        </>
                      )}

                      {activeTab === "buyers" && (
                        <>
                          <td className="px-6 py-4 font-bold text-green-700">{record.store_name}</td>
                          <td className="px-6 py-4">{record.city}</td>
                          <td className="px-6 py-4">{record.vehicle_brands?.join("، ")}</td>
                          <td className="px-6 py-4" dir="ltr">{record.phone_number}</td>
                          <td className="px-6 py-4">{record.import_experience ? "✅ نعم" : "❌ لا"}</td>
                        </>
                      )}

                      {activeTab === "logistics_partners" && (
                        <>
                          <td className="px-6 py-4 font-bold text-orange-600">{record.company_name}</td>
                          <td className="px-6 py-4">{record.service_type?.join("، ")}</td>
                          <td className="px-6 py-4">{record.operating_regions}</td>
                          <td className="px-6 py-4" dir="ltr">{record.whatsapp || record.phone}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}