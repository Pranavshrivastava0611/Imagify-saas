import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";

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
  title: "Imagify",
  description: "Saas application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>
      <html>
        <body>
      <main className="root">
        {/*sidebar */}
          <Sidebar/>
        {/*navbar */}
        <MobileNav/>
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
      </body>
      </html>
    </ClerkProvider>
  );
}
