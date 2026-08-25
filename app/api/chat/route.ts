//Claude streaming//
// OpenRouter streaming

import { streamText, convertToModelMessages } from "ai";

import { model, systemPrompt } from "@/lib/ai/config";

import { fetchMetaTags } from "@/lib/ai/tools/fetch-meta-tags";

console.log("OpenRouter key exists:", !!process.env.OPENROUTER_API_KEY);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: {
      fetchMetaTags,
    },
  });

  return result.toUIMessageStreamResponse();
}
