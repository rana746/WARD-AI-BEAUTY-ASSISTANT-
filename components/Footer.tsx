import Link from "next/link";

function SocialIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FB6F92] bg-white text-[#1d1a19] transition hover:border-[#FB6F92] hover:text-[#000000]"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#DA236A] bg-[#DA236A] text-[#ffffff]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1.2fr] lg:px-8">
        <div className="space-y-5">
          <p className="text-2xl font-semibold tracking-[0.44em] text-[#ffffff]">
            WARD
          </p>

          <div className="flex items-center gap-3">
            <SocialIcon label="Facebook">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M13.4 22v-8.1h2.7l.4-3.1h-3.1V7.5c0-.9.3-1.6 1.7-1.6h1.8V2.9c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.7-4.5 4.8v2.7H7.2v3.1h2.7V22h3.5Z" />
              </svg>
            </SocialIcon>

            <SocialIcon label="Instagram">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5-3.1a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
              </svg>
            </SocialIcon>

            <SocialIcon label="TikTok">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M15.3 2c.5 1.8 1.8 3 3.6 3.4v2.7a7 7 0 0 1-3.6-1v7.1a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v2.8a3.3 3.3 0 1 0 2.4 3.1V2h3.7Z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffffff]">
            About
          </h3>
          <ul className="space-y-3 text-sm text-[#ffffff]">
            <li>
              <Link href="/about" className="transition hover:text-[#1d1a19]">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-[#1d1a19]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffffff]">
            Terms &amp; Conditions
          </h3>
          <ul className="space-y-3 text-sm text-[#ffffff]">
            <li>
              <Link href="/terms" className="transition hover:text-[#1d1a19]">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <a href="#" className="transition hover:text-[#1d1a19]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-[#1d1a19]">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffffff]">
            Newsletter
          </h3>
          <p className="text-xl font-medium text-[#ffffff] sm:text-2xl">
            Hey beautiful, let&apos;s connect
          </p>

          <form
            className="flex w-full max-w-sm flex-col gap-3"
            aria-label="Newsletter sign up"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email address"
              className="h-12 w-full rounded-full border border-[#d8c9bf] bg-white px-4 text-sm text-[#1d1a19] placeholder:text-[#80756f] focus:border-[#1d1a19] focus:outline-none"
            />
            <button type="submit" className="btn-brand h-12 w-full">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#e3d8ce]">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-[11px] uppercase tracking-[0.18em] text-[#ffffff] sm:px-6 lg:px-8">
          <p>© 2026 WARD Beauty, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
