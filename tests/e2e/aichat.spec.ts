import { test, expect } from "@playwright/test";

test.describe("WARD AI primary flow", () => {
  test("user can send a message and see the assistant response", async ({
    page,
  }) => {
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: [
          'data: {"type":"start"}\n\n',
          'data: {"type":"text-start","id":"assistant-1"}\n\n',
          'data: {"type":"text-delta","id":"assistant-1","delta":"I recommend a gentle cleanser and moisturizer."}\n\n',
          'data: {"type":"text-end","id":"assistant-1"}\n\n',
          'data: {"type":"finish","finishReason":"stop"}\n\n',
          "data: [DONE]\n\n",
        ].join(""),
      });
    });

    await page.goto("/");

    const input = page.getByPlaceholder("Ask WARD AI...");
    const sendButton = page.getByRole("button", { name: "Send" });

    await expect(input).toBeVisible();
    await expect(sendButton).toBeDisabled();

    await input.fill("What moisturizer should I use?");

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
