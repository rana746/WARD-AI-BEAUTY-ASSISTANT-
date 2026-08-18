"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "New", href: "/new" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Makeup", href: "/makeup" },
  { label: "Skincare", href: "/skincare" },
  { label: "Gifts & Sets", href: "/gifts-sets" },
];

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[#1f1a18] transition hover:text-[#000000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1a18]/40"
    >
      {children}
    </button>
  );
}

export function MainNavbar() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY <= 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#efe5dd] bg-[#f9f5f2]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {isTopOfPage ? (
          <div className="w-10 shrink-0" aria-hidden="true" />
        ) : (
          <Link
            href="/"
            aria-label="WARD home"
            className="text-lg font-semibold tracking-[0.34em] text-[#1f1a18]"
          >
            WARD
          </Link>
        )}

        <nav
          aria-label="Main navigation"
          className="flex flex-1 items-center justify-center gap-3 text-center sm:gap-5 lg:gap-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#4d413d] transition hover:text-[#1d1a19] sm:text-xs lg:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {isTopOfPage ? (
          <div className="w-10 shrink-0" aria-hidden="true" />
        ) : (
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Search">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="5.5" />
                <path d="M16 16L21 21" />
              </svg>
            </IconButton>

            <IconButton label="Account">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 19c1.5-3 4.1-4.5 7-4.5s5.5 1.5 7 4.5" />
              </svg>
            </IconButton>

            <IconButton label="Shopping cart">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="18" r="1.5" />
                <circle cx="17" cy="18" r="1.5" />
                <path d="M3 4h2l2.3 9.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L20 7H7" />
              </svg>
            </IconButton>
          </div>
        )}
      </div>
    </header>
  );
}
