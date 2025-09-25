"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      setIsAuthed(!!token);
    };

    setMounted(true);
    checkAuth();

    const onStorage = (e) => {
      if (e.key === "auth_token") checkAuth();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const logout = () => {
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token_type");
      setIsAuthed(false);
      router.replace("/");
    } catch {}
  };

  if (!mounted) return null;

  return (
    <header
      role="navigation"
      aria-label="Main Navigation"
      className="sticky top-0 z-50 w-full bg-transparent"  
    >
      
      <div className="mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:h-[100px]">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3BA334] rounded-md"
          aria-label="Go to homepage"
        >
          <Image
            src="/logo.png"
            alt="ScapeSync Logo"
            width={147}
            height={60}
            priority
            className="w-[147px] h-auto"
            sizes="147px"
          />
        </button>

   
        <div className="hidden md:flex items-center">
          {!isAuthed ? (
            <Link
              href="/login"
              className="inline-block whitespace-nowrap rounded-lg bg-[#3BA334] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3BA334] sm:px-6 sm:py-2.5 sm:text-base"
            >
              Get Started
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/user"
                className="inline-block whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300 sm:px-5 sm:py-2.5 sm:text-base"
              >
                User Details
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-block whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 sm:px-6 sm:py-2.5 sm:text-base"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((s) => !s)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3BA334]"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          mobileOpen ? "max-h-64 border-t border-gray-200" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          {!isAuthed ? (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center rounded-lg bg-[#3BA334] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3BA334]"
            >
              Get Started
            </Link>
          ) : (
            <>
              <Link
                href="/user"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
              >
                User Details
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="block w-full text-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
