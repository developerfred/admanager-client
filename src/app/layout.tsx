import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { headers } from "next/headers"; 
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
  description: "Propagaganda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookies = headers().get('cookie')
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider cookies={cookies}>{children}</ContextProvider>      
	</body>
    </html>
  );
}
