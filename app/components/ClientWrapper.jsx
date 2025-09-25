"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();

  const noNavFooterRoutes = ["/register", "/login", "/verify", "/forgot-password", "/reset-password", "/logout", "/success", "/reset-otp", "/user"];
  const hideNavFooter = noNavFooterRoutes.includes(pathname);

  return (
    <>
    <div className="max-w-[104.9rem] mx-auto">
      {!hideNavFooter && <Navbar />}
      {children}
    </div>
    {!hideNavFooter && <Footer />}
    </>
  );
}
