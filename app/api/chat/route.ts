import { streamText, convertToModelMessages } from "ai";

import { model, systemPrompt } from "@/lib/ai/config";

import { fetchMetaTags } from "@/lib/ai/tools/fetch-meta-tags";

// Maximum time allowed for a streaming request
export const maxDuration = 30;

// Production safety limits
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Limit conversation size
    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({
          error: `Too many messages. Maximum allowed is ${MAX_MESSAGES}.`,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Limit individual message size
    for (const message of messages) {
      if (!message || typeof message !== "object") {
        return new Response(JSON.stringify({ error: "Invalid message." }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      const text = JSON.stringify(message);

      if (text.length > MAX_MESSAGE_LENGTH) {
        return new Response(
          JSON.stringify({
            error: `Message is too long. Maximum allowed length is ${MAX_MESSAGE_LENGTH} characters.`,
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
      tools: {
        fetchMetaTags,
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error("WARD AI stream error:", error);
        return "Something went wrong while generating the response.";
      },
    });
  } catch (error) {
    console.error("WARD AI request error:", error);

    return new Response(
      JSON.stringify({
        error: "Unable to process the request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
