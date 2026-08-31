"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const AIChat = dynamic(() => import("@/components/aichat"), {
  ssr: false,
});

export default function AIChatClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "600px",
      },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {shouldLoad && <AIChat />}
    </div>
  );
}
