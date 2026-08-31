"use client";

import dynamic from "next/dynamic";

const AIChat = dynamic(() => import("@/components/aichat"), {
  ssr: false,
});

export default function AIChatClient() {
  return <AIChat />;
}
