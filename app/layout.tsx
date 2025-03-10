import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";



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
