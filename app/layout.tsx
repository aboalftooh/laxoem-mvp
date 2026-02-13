import type { Metadata } from "next";
// استدعاء خطوط جوجل المدمجة في Next.js
import { Inter, Cairo } from "next/font/google";
import "./globals.css";

// تجهيز خط Inter للإنجليزي
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// تجهيز خط Cairo للعربي
const cairo = Cairo({ 
  subsets: ["arabic"],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LAXOEM | Digital Supply Network",
  description: "شبكة توريد رقمية لقطاع قطع الغيار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // هنا بنطبق الخطين على الموقع، وفي الصفحات هنحدد مين يشتغل بناءً على اللغة
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}