async function getHealth() {
  const response = await fetch("http://localhost:3000/api/health", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  return response.json();
}

export default async function HealthPage() {
  const health = await getHealth();

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold">WARD Health Check</h1>

        <div className="mt-8 rounded-2xl border border-[#ffc8dd] p-6">
          <p>
            <strong>Status:</strong> {health.status}
          </p>

          <p>
            <strong>Service:</strong> {health.service}
          </p>

          <p>
            <strong>Timestamp:</strong> {health.timestamp}
          </p>
        </div>
      </div>
    </main>
  );
}
