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
            src="/Logo.png"
            alt="ScapeSync Logo"
            width={147}
            height={60}
            priority
            className="w-[147px] h-auto"
            sizes="147px"
          />
        </button>

        <div className="flex items-center">
          {!isAuthed ? (
            <Link
              href="/user"
              className="inline-block whitespace-nowrap rounded-lg bg-[#3BA334] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3BA334] sm:px-6 sm:py-2.5 sm:text-base"
            >
              Get Started
            </Link>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="inline-block whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 sm:px-6 sm:py-2.5 sm:text-base"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
