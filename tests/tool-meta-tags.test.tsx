import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ToolMetaTags from "@/components/tool-meta-tags";

describe("ToolMetaTags", () => {
  it("shows the preparing state while the URL is streaming", () => {
    render(<ToolMetaTags state="input-streaming" />);

    expect(screen.getByText("Preparing webpage analysis")).toBeInTheDocument();

    expect(
      screen.getByText("WARD AI is preparing the URL..."),
    ).toBeInTheDocument();
  });

  it("shows the URL when webpage analysis starts", () => {
    render(
      <ToolMetaTags
        state="input-available"
        input={{
          url: "https://example.com",
        }}
      />,
    );

    expect(screen.getByText("Analyzing webpage")).toBeInTheDocument();

    expect(screen.getByText("https://example.com")).toBeInTheDocument();
  });

  it("shows the extracted webpage metadata", () => {
    render(
      <ToolMetaTags
        state="output-available"
        output={{
          url: "https://example.com",
          title: "Example Beauty Website",
          description: "A beauty website for skincare and makeup.",
          canonical: "https://example.com/",
          ogImage: "https://example.com/preview.jpg",
        }}
      />,
    );

    expect(screen.getByText("Webpage metadata")).toBeInTheDocument();

    expect(screen.getByText("https://example.com")).toBeInTheDocument();

    expect(screen.getByText("Example Beauty Website")).toBeInTheDocument();

    expect(
      screen.getByText("A beauty website for skincare and makeup."),
    ).toBeInTheDocument();

    expect(screen.getByText("https://example.com/")).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Open Graph preview",
      }),
    ).toHaveAttribute("src", "https://example.com/preview.jpg");
  });

  it("shows Not found when optional metadata is missing", () => {
    render(
      <ToolMetaTags
        state="output-available"
        output={{
          url: "https://example.com",
          title: null,
          description: null,
          canonical: null,
          ogImage: null,
        }}
      />,
    );

    expect(screen.getByText("Webpage metadata")).toBeInTheDocument();

    expect(screen.getAllByText("Not found")).toHaveLength(4);
  });

  it("shows the tool error message when webpage analysis fails", () => {
    render(
      <ToolMetaTags
        state="output-error"
        errorText="The website could not be reached."
      />,
    );

    expect(
      screen.getByText("Couldn't analyze this webpage"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("The website could not be reached."),
    ).toBeInTheDocument();
  });

  it("shows a fallback error message when no error text is provided", () => {
    render(<ToolMetaTags state="output-error" />);

    expect(
      screen.getByText("Couldn't analyze this webpage"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("The webpage could not be fetched."),
    ).toBeInTheDocument();
  });

  it("renders nothing for an unknown state", () => {
    const { container } = render(<ToolMetaTags state="unknown" />);

    expect(container).toBeEmptyDOMElement();
  });
});
