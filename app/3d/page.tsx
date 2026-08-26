import Ward3DScene from "@/components/3d/ward-3d-scene";

export default function ThreeDPage() {
  return (
    <main className="min-h-screen bg-[#fff5f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#fb6f92]">
            WARD Beauty Studio
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#351e25] sm:text-5xl">
            Explore WARD in 3D
          </h1>

          <p className="mt-3 max-w-2xl text-[#7a626a]">
            Explore the WARD beauty collection in an interactive 3D space.
          </p>
        </div>

        <Ward3DScene />
      </div>
    </main>
  );
}
