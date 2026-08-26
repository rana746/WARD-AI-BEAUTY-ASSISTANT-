import { test, expect } from "@playwright/test";

test.describe("WARD AI primary flow", () => {
  test("user can send a message and see the response", async ({ page }) => {
    await page.route("**/api/chat", async (route) => {
      const response = [
        'data: {"type":"start"}\n\n',
        'data: {"type":"text-start","id":"text-1"}\n\n',
        'data: {"type":"text-delta","id":"text-1","delta":"I recommend a gentle cleanser and moisturizer."}\n\n',
        'data: {"type":"text-end","id":"text-1"}\n\n',
        'data: {"type":"finish","finishReason":"stop"}\n\n',
        "data: [DONE]\n\n",
      ].join("");

      await route.fulfill({
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
        body: response,
      });
    });

    await page.goto("/");

    const input = page.getByPlaceholder("Ask WARD AI...");

    await expect(input).toBeVisible();

    await input.fill("What moisturizer should I use?");

    const sendButton = page.getByRole("button", {
      name: "Send",
    });

    await expect(sendButton).toBeEnabled();

    await sendButton.click();

    await expect(
      page.getByText("What moisturizer should I use?"),
    ).toBeVisible();

    await expect(
      page.getByText("I recommend a gentle cleanser and moisturizer."),
    ).toBeVisible();
  });
});
