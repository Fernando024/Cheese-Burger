import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import WhatsAppFlotante from "@/components/WhatsAppFlotante";
import StrapiLivePreview from "@/components/StrapiLivePreview";
import { getFooter, getNavbar, getGlobal } from "@/lib/strapi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "",
    template: "%s",
  },
  description: "",
};

export default async function RootLayout({ children }) {
  const [navbar, footer, globalData] = await Promise.all([
    getNavbar(),
    getFooter(),
    getGlobal(),
  ]);

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="site-wrapper">
          <header className="site-header">
            <Navbar data={navbar} />
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <Footer data={footer} />
          </footer>
        </div>
        <WhatsAppFlotante data={globalData?.whatsapp} />
        <StrapiLivePreview />
      </body>
    </html>
  );
}
