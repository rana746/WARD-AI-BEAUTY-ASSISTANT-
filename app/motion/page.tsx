"use client";

import { useState } from "react";
import AnimatedSendButton from "@/components/animated-send-button";

type DemoMode = "success" | "error" | "disabled";
export default function MotionDemoPage() {
  const [mode, setMode] = useState<DemoMode>("success");

  const simulateRequest = async () => {
    const requestMode = mode;
    const delay = 700 + Math.random() * 900;

    await new Promise((resolve) => setTimeout(resolve, delay));

    if (requestMode === "error") {
      throw new Error("Simulated request failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF5F7] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FB6F92]">
            WARD AI
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#351E25]">
            Button Motion Demo
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#7A626A]">
            A stateful Send button designed to communicate interaction, loading,
            success, and error without abrupt state changes.
          </p>
        </div>

        <section className="rounded-3xl border border-[#FFE4EC] bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="mb-6 text-sm font-medium text-[#7A626A]">
              Current test mode:{" "}
              <span className="font-semibold text-[#351E25]">{mode}</span>
            </p>

            <AnimatedSendButton
              onSend={simulateRequest}
              disabled={mode === "disabled"}
            />
          </div>

          <div className="border-t border-[#FFE4EC] pt-6">
            <p className="mb-4 text-sm font-semibold text-[#351E25]">
              Test the states
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setMode("success")}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  mode === "success"
                    ? "bg-[#FB6F92] text-white"
                    : "bg-[#FFF0F4] text-[#7A626A] hover:-translate-y-0.5"
                }`}
              >
                Force success
              </button>

              <button
                type="button"
                onClick={() => setMode("error")}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  mode === "error"
                    ? "bg-red-600 text-white"
                    : "bg-[#FFF0F4] text-[#7A626A] hover:-translate-y-0.5"
                }`}
              >
                Force error
              </button>
              <button
                type="button"
                onClick={() => setMode("disabled")}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  mode === "disabled"
                    ? "bg-[#351E25] text-white"
                    : "bg-[#FFF0F4] text-[#7A626A] hover:-translate-y-0.5"
                }`}
              >
                Disabled
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-[#FFE4EC] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#351E25]">Motion notes</h2>

          <p className="mt-3 text-sm leading-6 text-[#7A626A]">
            Short ease-out transitions are used for interaction feedback, while
            loading and success states use slightly longer transitions to make
            the state change feel intentional. Motion is limited to transform
            and opacity where possible to keep the interaction smooth and
            compositor-friendly.
          </p>

          <p className="mt-3 text-sm leading-6 text-[#7A626A]">
            Reduced-motion preferences are respected so that animations are
            reduced without removing important visual feedback.
          </p>
        </section>
      </div>
    </main>
  );
}
