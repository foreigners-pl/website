import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
// import CustomCursor from "@/components/ui/CustomCursor";
import CookieConsent from "@/components/CookieConsent";
import SessionTracker from "@/components/SessionTracker";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOREIGNERS.pl - Your Trusted Partner in Poland",
  description: "Professional immigration and legal services for foreigners in Poland. Work permits, residence cards, business setup, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white`}
      >
        {/* <CustomCursor /> */}
        <SessionTracker />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}

