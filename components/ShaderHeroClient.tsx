"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ShaderHero = dynamic(() => import("@/components/ShaderHero"), {
  ssr: false,
});

export default function ShaderHeroClient() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadShader = () => {
      setShouldLoad(true);
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(loadShader, {
        timeout: 2000,
      });
    } else {
      timeoutId = setTimeout(loadShader, 1000);
    }

    return () => {
      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!shouldLoad) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#DA236A]">
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
