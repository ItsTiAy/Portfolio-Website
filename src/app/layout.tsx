import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Background from "./components/background";
import Accessibility from "./components/accessibility";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Thomas Stanway",
  description: "Portfolio for Thomas Stanway",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}>
        <Background/>
        <Accessibility/>
        {children}
      </body>
    </html>
  );
}
