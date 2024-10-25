import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import ContextProvider from '@/context'

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
  title: "a+",
  description: "Admanager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] min-h-screen text-white font-sans">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <Header />
          <main className="relative max-w-7xl mx-auto mt-6 sm:mt-12 p-4 sm:p-6 z-10">
            <ContextProvider cookies={null}>{children}</ContextProvider>      
          </main>
          <Footer />
        </div>
        
	</body>
    </html>
  );
}
