"use client";

type MetaTagsResult = {
  url: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  ogImage: string | null;
};

type ToolMetaTagsProps = {
  state: string;
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

function getInputUrl(input: unknown): string | undefined {
  if (
    typeof input === "object" &&
    input !== null &&
    "url" in input &&
    typeof input.url === "string"
  ) {
    return input.url;
  }

  return undefined;
}

function getMetaTagsResult(output: unknown): MetaTagsResult | null {
  if (typeof output !== "object" || output === null) {
    return null;
  }

  const value = output as Record<string, unknown>;

  if (typeof value.url !== "string") {
    return null;
  }

  return {
    url: value.url,
    title: typeof value.title === "string" ? value.title : null,
    description:
      typeof value.description === "string" ? value.description : null,
    canonical: typeof value.canonical === "string" ? value.canonical : null,
    ogImage: typeof value.ogImage === "string" ? value.ogImage : null,
  };
}

export default function ToolMetaTags({
  state,
  input,
  output,
  errorText,
}: ToolMetaTagsProps) {
  const inputUrl = getInputUrl(input);
  const metadata = getMetaTagsResult(output);

  if (state === "input-streaming") {
    return (
      <div className="my-3 rounded-2xl border border-[#FFD1DE] bg-[#FFF7F9] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE4EC]">
            <span className="animate-pulse text-[#FB6F92]">✦</span>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#351E25]">
              Preparing webpage analysis
            </p>

            <p className="mt-1 text-xs text-[#7A626A]">
              WARD AI is preparing the URL...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "input-available") {
    return (
      <div className="my-3 rounded-2xl border border-[#FFD1DE] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE4EC]">
            <span className="text-[#FB6F92]">↗</span>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#351E25]">
              Analyzing webpage
            </p>

            <p className="mt-1 truncate text-xs text-[#7A626A]">
              {inputUrl ?? "URL received"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "output-error") {
    return (
      <div className="my-3 rounded-2xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
            <span className="text-red-600">!</span>
          </div>

          <div>
            <p className="text-sm font-semibold text-red-800">
              Couldn&apos;t analyze this webpage
            </p>

            <p className="mt-1 text-xs leading-5 text-red-700">
              {errorText ?? "The webpage could not be fetched."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "output-available" && metadata) {
    return (
      <div className="my-3 overflow-hidden rounded-2xl border border-[#FFD1DE] bg-white shadow-sm">
        <div className="border-b border-[#FFE4EC] bg-[#FFF7F9] px-4 py-3">
          <p className="text-sm font-semibold text-[#351E25]">
            Webpage metadata
          </p>

          <p className="mt-1 truncate text-xs text-[#7A626A]">{metadata.url}</p>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#FB6F92]">
              Title
            </p>

            <p className="mt-1 text-sm leading-6 text-[#351E25]">
              {metadata.title ?? "Not found"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#FB6F92]">
              Description
            </p>

            <p className="mt-1 text-sm leading-6 text-[#351E25]">
              {metadata.description ?? "Not found"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#FB6F92]">
              Canonical
            </p>

            <p className="mt-1 break-all text-sm leading-6 text-[#351E25]">
              {metadata.canonical ?? "Not found"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#FB6F92]">
              Open Graph image
            </p>

            {metadata.ogImage ? (
              <div className="mt-2 overflow-hidden rounded-xl border border-[#FFE4EC]">
                <img
                  src={metadata.ogImage}
                  alt="Open Graph preview"
                  className="max-h-48 w-full object-cover"
                />
              </div>
            ) : (
              <p className="mt-1 text-sm text-[#7A626A]">Not found</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
