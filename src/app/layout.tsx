import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "LeShop",
  description: "LeShop - ваш магазин",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={rubik.variable}>
      <body className="min-h-screen bg-[#F6F8FC] text-[#0F172A] font-sans antialiased">
        <Header />
        <main className="min-h-[calc(100vh-80px)] pt-6 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
