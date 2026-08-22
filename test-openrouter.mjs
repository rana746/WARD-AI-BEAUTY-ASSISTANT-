const apiKey = process.env.OPENROUTER_API_KEY;

console.log("Key loaded:", Boolean(apiKey));

if (!apiKey) {
  console.log("No OpenRouter API key found.");
  process.exit(1);
}

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "openrouter/free",
    messages: [
      {
        role: "user",
        content: "Say hello in one short sentence.",
      },
    ],
  }),
});

console.log("Status:", response.status);
console.log(await response.text());
