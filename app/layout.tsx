import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FirstNavbar } from "@/components/FirstNavbar";
import { Footer } from "@/components/Footer";
import { MainNavbar } from "@/components/MainNavbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WARD Beauty — AI Beauty Assistant",
    template: "%s | WARD Beauty",
  },
  description:
    "Discover beauty, skincare, and makeup with WARD — an AI-powered beauty assistant and interactive beauty experience.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f9f5f2] text-[#1d1a19]">
        <div className="flex min-h-screen flex-col">
          <FirstNavbar />
          <MainNavbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
