import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AIChat from "@/components/aichat";

const mockUseChat = vi.fn();

vi.mock("@ai-sdk/react", () => ({
  useChat: () => mockUseChat(),
}));

vi.mock("@/components/tool-meta-tags", () => ({
  default: () => <div>Tool result</div>,
}));

beforeEach(() => {
  mockUseChat.mockReset();

  mockUseChat.mockReturnValue({
    messages: [],
    sendMessage: vi.fn(),
    status: "ready",
    stop: vi.fn(),
    error: undefined,
    regenerate: vi.fn(),
  });

  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: vi.fn(),
  });
});

describe("AIChat", () => {
  it("renders the WARD AI welcome state", () => {
    render(<AIChat />);

    expect(
      screen.getByRole("heading", { name: "WARD AI" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Your personal beauty assistant."),
    ).toBeInTheDocument();

    expect(screen.getByText("Welcome to WARD AI")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Ask me anything about beauty, skincare, makeup, or your beauty routine.",
      ),
    ).toBeInTheDocument();
  });

  it("renders a user message", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "user-1",
          role: "user",
          parts: [
            {
              type: "text",
              text: "What moisturizer should I use?",
            },
          ],
        },
      ],
      sendMessage: vi.fn(),
      status: "ready",
      stop: vi.fn(),
      error: undefined,
      regenerate: vi.fn(),
    });

    render(<AIChat />);

    expect(screen.getByText("You")).toBeInTheDocument();

    expect(
      screen.getByText("What moisturizer should I use?"),
    ).toBeInTheDocument();
  });

  it("renders an assistant message", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "assistant-1",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Start with a gentle cleanser and moisturizer.",
            },
          ],
        },
      ],
      sendMessage: vi.fn(),
      status: "ready",
      stop: vi.fn(),
      error: undefined,
      regenerate: vi.fn(),
    });

    render(<AIChat />);

    expect(
      screen.getByText("Start with a gentle cleanser and moisturizer."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "WARD AI" }),
    ).toBeInTheDocument();
  });

  it("shows the thinking state while a response is pending", () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "submitted",
      stop: vi.fn(),
      error: undefined,
      regenerate: vi.fn(),
    });

    render(<AIChat />);

    expect(screen.getByText("WARD AI is thinking")).toBeInTheDocument();
  });

  it("shows the streamed assistant message", () => {
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "assistant-streaming",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "I recommend a gentle cleanser",
            },
          ],
        },
      ],
      sendMessage: vi.fn(),
      status: "streaming",
      stop: vi.fn(),
      error: undefined,
      regenerate: vi.fn(),
    });

    render(<AIChat />);

    expect(
      screen.getByText("I recommend a gentle cleanser"),
    ).toBeInTheDocument();
  });

  it("shows the error state and retry action", () => {
    const regenerate = vi.fn();

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "error",
      stop: vi.fn(),
      error: new Error("Request failed"),
      regenerate,
    });

    render(<AIChat />);

    expect(
      screen.getByText("Something went wrong while generating the response."),
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", {
      name: "Try again",
    });

    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);

    expect(regenerate).toHaveBeenCalledTimes(1);
  });

  it("enables Send when the user enters a message", async () => {
    const user = userEvent.setup();

    render(<AIChat />);

    const input = screen.getByRole("textbox", {
      name: /ask ward ai/i,
    });

    const sendButton = screen.getByRole("button", {
      name: "Send",
    });

    expect(sendButton).toBeDisabled();

    await user.type(input, "What cleanser should I use?");

    expect(sendButton).toBeEnabled();
  });

  it("sends the submitted message and clears the input", async () => {
    const user = userEvent.setup();
    const sendMessage = vi.fn();

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage,
      status: "ready",
      stop: vi.fn(),
      error: undefined,
      regenerate: vi.fn(),
    });

    render(<AIChat />);

    const input = screen.getByRole("textbox", {
      name: /ask ward ai/i,
    });

    await user.type(input, "What cleanser should I use?");

    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(sendMessage).toHaveBeenCalledWith({
      text: "What cleanser should I use?",
    });

    expect(input).toHaveValue("");
  });

  it("shows Stop while the response is streaming", () => {
    const stop = vi.fn();

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "streaming",
      stop,
      error: undefined,
      regenerate: vi.fn(),
    });

    render(<AIChat />);

    expect(screen.getByRole("button", { name: "Stop" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Send" }),
    ).not.toBeInTheDocument();
  });

  it("stops an active response when Stop is clicked", () => {
    const stop = vi.fn();

    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      status: "streaming",
      stop,
      error: undefined,
      regenerate: vi.fn(),
    });

    render(<AIChat />);

    fireEvent.click(screen.getByRole("button", { name: "Stop" }));

    expect(stop).toHaveBeenCalledTimes(1);
  });
});
