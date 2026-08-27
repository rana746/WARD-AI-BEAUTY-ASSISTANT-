"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
      className="flex h-10 w-10 items-center justify-center rounded-full text-[#ffffff] transition hover:text-[#000000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f1a18]/40"
    >
      {children}
    </button>
  );
}

export function FirstNavbar() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY <= 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isTopOfPage) {
    return null;
  }

  return (
    <header className="border-b border-[#ffffff] bg-[#DA236A]">
      <div className="mx-auto flex max-w-7xl items-center  justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="WARD home"
          className="text-base font-bold tracking-[0.42em] text-[#ffffff] sm:text-3xl"
        >
          WARD
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <IconButton label="Search">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 stroke-current"
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
              className="h-5 w-5 stroke-current"
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
              className="h-5 w-5 stroke-current"
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
      </div>
    </header>
  );
}
