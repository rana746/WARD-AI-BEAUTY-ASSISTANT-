"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("WARD AI application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF5F7] px-6">
      <div className="w-full max-w-md rounded-3xl border border-[#FFE4EC] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE4EC]">
          <span className="text-2xl text-[#FB6F92]">!</span>
        </div>

        <h1 className="text-2xl font-semibold text-[#351E25]">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#7A626A]">
          WARD AI ran into an unexpected problem. You can try loading this page
          again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-[#FB6F92] px-5 py-3 font-medium text-white transition hover:bg-[#D94F72]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
