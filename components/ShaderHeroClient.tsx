"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ShaderHero = dynamic(() => import("@/components/ShaderHero"), {
  ssr: false,
  loading: () => null,
});

export default function ShaderHeroClient() {
  const [shouldLoadShader, setShouldLoadShader] = useState(false);

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setShouldLoadShader(true);
    }, 1000);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldLoadShader) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#EFA0B8] via-[#FFC8DD] to-white">
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em]">WARD</p>

            <h1 className="text-5xl font-semibold md:text-7xl">
              Beauty, reimagined.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg">
              A beauty experience designed around you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <ShaderHero />;
}
