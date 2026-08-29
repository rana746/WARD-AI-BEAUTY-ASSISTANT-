"use client";

import dynamic from "next/dynamic";

const ShaderHero = dynamic(() => import("@/components/ShaderHero"), {
  ssr: false,
});

export default function ShaderHeroClient() {
  return <ShaderHero />;
}
