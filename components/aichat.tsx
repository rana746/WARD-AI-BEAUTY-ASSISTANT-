// Chat component messages -> input send stop streaming state scroll//

"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import ToolMetaTags from "./tool-meta-tags";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);

  const { messages, sendMessage, status, stop } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  const lastMessage = messages[messages.length - 1];

  const hasAssistantText =
    lastMessage?.role === "assistant" &&
    lastMessage.parts?.some(
      (part) => part.type === "text" && part.text.length > 0,
    );

  // Show thinking indicator before the first text token.
  const showThinking = status === "submitted" && !hasAssistantText;

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim() || isLoading) return;

    const message = input.trim();

    setInput("");

    await sendMessage({ text: message });
  };

  // Detect whether the user is currently near the bottom.
  const handleScroll = () => {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    setIsAtBottom(distanceFromBottom < 80);
  };

  // Keep the conversation pinned to the bottom while the user
  // is already at the bottom and new streamed content arrives.
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container || !isAtBottom) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isAtBottom]);

  const jumpToLatest = () => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    setIsAtBottom(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FFF5F7] p-4 sm:p-6">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[#351E25]">
            WARD AI
          </h1>

          <p className="mt-2 text-[#7A626A]">Your personal beauty assistant.</p>
        </div>

        <div className="relative flex-1">
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="h-[calc(100vh-220px)] space-y-4 overflow-y-auto rounded-3xl border border-[#FFE4EC] bg-white p-4 shadow-sm sm:h-[calc(100vh-240px)] sm:p-5"
          >
            {messages.length === 0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE4EC]">
                  <span className="text-2xl text-[#FB6F92]">✦</span>
                </div>

                <h2 className="text-lg font-semibold text-[#351E25]">
                  Welcome to WARD AI
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#7A626A]">
                  Ask me anything about beauty, skincare, makeup, or your beauty
                  routine.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[80%] ${
                    message.role === "user"
                      ? "bg-[#FB6F92] text-white"
                      : "bg-[#FFE4EC] text-[#351E25]"
                  }`}
                >
                  <p
                    className={`mb-1 text-xs font-semibold uppercase tracking-wide ${
                      message.role === "user"
                        ? "text-white/75"
                        : "text-[#FB6F92]"
                    }`}
                  >
                    {message.role === "user" ? "You" : "WARD AI"}
                  </p>

                  <div className="whitespace-pre-wrap text-sm leading-6 sm:text-base">
                    {message.parts?.map((part, index) => {
                      if (part.type === "text") {
                        return <span key={index}>{part.text}</span>;
                      }

                      if (part.type === "tool-fetchMetaTags") {
                        switch (part.state) {
                          case "input-streaming":
                            return (
                              <ToolMetaTags
                                key={index}
                                state="input-streaming"
                              />
                            );

                          case "input-available":
                            return (
                              <ToolMetaTags
                                key={index}
                                state="input-available"
                                input={part.input}
                              />
                            );

                          case "output-available":
                            return (
                              <ToolMetaTags
                                key={index}
                                state="output-available"
                                input={part.input}
                                output={part.output}
                              />
                            );

                          case "output-error":
                            return (
                              <ToolMetaTags
                                key={index}
                                state="output-error"
                                errorText={part.errorText}
                              />
                            );

                          default:
                            return null;
                        }
                      }

                      return null;
                    })}
                  </div>
                </div>
              </div>
            ))}

            {showThinking && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-[#FFF0F4] px-4 py-3 text-[#7A626A]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">WARD AI is thinking</span>

                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FB6F92]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FB6F92] [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FB6F92] [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isAtBottom && (
            <button
              type="button"
              onClick={jumpToLatest}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#351E25] px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-[#4A2B34]"
            >
              ↓ Jump to latest
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2 sm:gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask WARD AI..."
            disabled={isLoading}
            className="min-w-0 flex-1 rounded-xl border border-[#FFD1DE] bg-white px-4 py-3 text-[#351E25] outline-none placeholder:text-[#B69CA5] focus:border-[#FB6F92] focus:ring-2 focus:ring-[#FB6F92]/20"
          />

          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="shrink-0 rounded-xl bg-[#351E25] px-4 py-3 font-medium text-white transition hover:bg-[#4A2B34] sm:px-5"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="shrink-0 rounded-xl bg-[#FB6F92] px-4 py-3 font-medium text-white transition hover:bg-[#D94F72] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
            >
              Send
            </button>
          )}
        </form>
      </div>
    </main>
  );
}
