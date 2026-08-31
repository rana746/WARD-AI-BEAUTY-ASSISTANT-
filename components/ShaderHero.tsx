"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

import { fragmentShader, vertexShader } from "@/lib/shaders/wardHero";

import { useReducedMotion } from "@/app/hooks/useReducedMotion";

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { size } = useThree();

  const [isVisible, setIsVisible] = useState(true);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useFrame((state) => {
    if (!materialRef.current || !isVisible || prefersReducedMotion) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    uniforms.u_time.value = state.clock.getElapsedTime();

    uniforms.u_resolution.value.set(size.width, size.height);

    uniforms.u_mouse.value.set(
      state.pointer.x * 0.5 + 0.5,
      state.pointer.y * 0.5 + 0.5,
    );
  });

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: {
            value: 0,
          },

          u_resolution: {
            value: new THREE.Vector2(size.width, size.height),
          },

          u_mouse: {
            value: new THREE.Vector2(0.5, 0.5),
          },
        }}
      />
    </mesh>
  );
}

export default function ShaderHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={`relative min-h-screen overflow-hidden ${
        prefersReducedMotion
          ? "bg-gradient-to-b from-[#DA236A] via-[#d90370] to-white"
          : ""
      }`}
    >
      {!prefersReducedMotion && (
        <Canvas
          className="!absolute !inset-0 !h-full !w-full"
          dpr={[1, 2]}
          camera={{
            position: [0, 0, 1],
            fov: 75,
          }}
        >
          <ShaderPlane />
        </Canvas>
      )}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center ">
        <div>
          <h1 className="mb-4 text-sm uppercase tracking-[0.3em]">WARD</h1>

          <h3 className="text-5xl font-semibold md:text-7xl">
            Beauty, reimagined.
          </h3>

          <p className="mx-auto mt-6 max-w-xl text-base md:text-lg">
            A beauty experience designed around you.
          </p>
        </div>
      </div>
    </section>
  );
}
