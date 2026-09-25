import type { Metadata } from "next";
import { Bangers, Inter } from "next/font/google";
import localFont from "next/font/local";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import Footer from "@/components/layout/Footer";
import WebNetBackground from "@/components/ui/WebNetBackground";
import CollegeBackdrop from "@/components/ui/CollegeBackdrop";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const samarkan = localFont({
  src: "./fonts/samarkan.ttf",
  variable: "--font-samarkan",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} - ${SITE_TAGLINE}`,
  description: SITE_TAGLINE,
  icons: {
    icon: "/images/branding/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bangers.variable} ${inter.variable} ${samarkan.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col bg-web-black text-web-white relative">
        <CollegeBackdrop />
        <WebNetBackground />
        <div className="flex-1 relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
