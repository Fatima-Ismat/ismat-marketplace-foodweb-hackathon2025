
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Inter } from "@next/font/google";
import {ClerkProvider} from "@clerk/nextjs";

const inter = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ismat Restaurant",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased`}>
          
            <div className={`${inter.className}`}>
              <Header />
              {children}
              <Footer />
            </div>
            
        </body>
      </html>
      </ClerkProvider>
  );
}
