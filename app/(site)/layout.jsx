"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <div className="max-w-[104.9rem] mx-auto">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
