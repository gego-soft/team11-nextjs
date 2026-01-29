import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/Sidebar/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team 11",
  description: "",
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
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="flex min-h-[calc(100vh-72px)]">
          {/* <Sidebar /> */}

          <main className="flex-1">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
