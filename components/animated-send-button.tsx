"use client";

import { useEffect, useState } from "react";

type ButtonState = "idle" | "loading" | "success" | "error";

type AnimatedSendButtonProps = {
  onSend?: () => Promise<void> | void;
  disabled?: boolean;
};

export default function AnimatedSendButton({
  onSend,
  disabled = false,
}: AnimatedSendButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");

  const handleClick = async () => {
    if (disabled || state === "loading") return;

    setState("loading");

    try {
      await onSend?.();

      setState("success");
    } catch {
      setState("error");
    }
  };

  useEffect(() => {
    if (state !== "success" && state !== "error") return;

    const timeout = setTimeout(
      () => {
        setState("idle");
      },
      state === "success" ? 1200 : 1800,
    );

    return () => clearTimeout(timeout);
  }, [state]);

  const isDisabled = disabled || state === "loading";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      aria-live="polite"
      aria-label={
        state === "loading"
          ? "Sending message"
          : state === "success"
            ? "Message sent"
            : state === "error"
              ? "Try sending again"
              : "Send message"
      }
      className={`
        group relative flex min-w-[110px] items-center justify-center
        overflow-hidden rounded-xl px-5 py-3 font-medium text-white
        transition-all duration-200 ease-out
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#FB6F92]
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        ${
          state === "error"
            ? "bg-red-600"
            : state === "success"
              ? "bg-green-600"
              : "bg-[#FB6F92] hover:-translate-y-0.5 hover:bg-[#D94F72] active:translate-y-0"
        }
      `}
    >
      <span
        className={`
          flex items-center gap-2
          transition-all duration-200 ease-out
          ${
            state === "loading"
              ? "scale-95 opacity-90"
              : "scale-100 opacity-100"
          }
        `}
      >
        {state === "idle" && (
          <span className="transition-opacity duration-200">Send</span>
        )}

        {state === "loading" && (
          <>
            <span
              className="
                h-4 w-4 animate-spin rounded-full
                border-2 border-white/40 border-t-white
                motion-reduce:animate-none
              "
              aria-hidden="true"
            />
            <span>Sending...</span>
          </>
        )}

        {state === "success" && (
          <>
            <span
              className="
                text-lg
                transition-transform duration-300 ease-out
                motion-reduce:transition-none
              "
              aria-hidden="true"
            >
              ✓
            </span>

            <span>Sent</span>
          </>
        )}

        {state === "error" && (
          <>
            <span
              className="
                text-lg
                transition-transform duration-200 ease-out
                motion-reduce:transition-none
              "
              aria-hidden="true"
            >
              ↻
            </span>

            <span>Try again</span>
          </>
        )}
      </span>
    </button>
  );
}
