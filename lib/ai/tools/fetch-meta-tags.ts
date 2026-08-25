import { z } from "zod";

export const fetchMetaTags = {
  description:
    "Fetches the title, description, canonical URL, and Open Graph image from a webpage.",
  inputSchema: z.object({
    url: z.string().url().describe("The URL of the webpage to analyze"),
  }),
  execute: async ({ url }: { url: string }) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch the webpage: ${response.status}`);
      }

      const html = await response.text();

      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const descriptionMatch = html.match(
        /<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i,
      );
      const canonicalMatch = html.match(
        /<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["'][^>]*>/i,
      );
      const ogImageMatch = html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["'](.*?)["'][^>]*>/i,
      );

      return {
        url,
        title: titleMatch?.[1]?.trim() ?? null,
        description: descriptionMatch?.[1]?.trim() ?? null,
        canonical: canonicalMatch?.[1]?.trim() ?? null,
        ogImage: ogImageMatch?.[1]?.trim() ?? null,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to analyze webpage",
      );
    }
  },
};
