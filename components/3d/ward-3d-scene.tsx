"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

type Product = {
  name: string;
  color: string;
  position: [number, number, number];
  description: string;
  price: string;
};

const products: Product[] = [
  {
    name: "WARD Skin Tint",
    color: "#b9b5b0",
    position: [-1.4, -0.05, 0.4],
    description: "Lightweight skin tint with a natural finish.",
    price: "$32",
  },
  {
    name: "WARD Lip Gloss",
    color: "#f4a9ba",
    position: [-0.45, -0.05, 0.2],
    description: "High-shine gloss for a soft, glossy finish.",
    price: "$22",
  },
  {
    name: "WARD Blush",
    color: "#e997ae",
    position: [0.45, -0.05, 0.2],
    description: "Buildable blush with a soft, natural glow.",
    price: "$26",
  },
  {
    name: "WARD Glow Cream",
    color: "#f5c6b5",
    position: [1.4, -0.05, 0.4],
    description: "Hydrating cream for a fresh luminous finish.",
    price: "$30",
  },
];

function HeartMirror() {
  const shape = useMemo(() => {
    const heart = new THREE.Shape();

    heart.moveTo(0, -1.4);
    heart.bezierCurveTo(-1.8, -0.2, -2.4, 1.1, -1.3, 1.8);
    heart.bezierCurveTo(-0.5, 2.3, 0, 1.7, 0, 1.2);
    heart.bezierCurveTo(0, 1.7, 0.5, 2.3, 1.3, 1.8);
    heart.bezierCurveTo(2.4, 1.1, 1.8, -0.2, 0, -1.4);

    return heart;
  }, []);

  return (
    <group position={[0, 1.8, 0]}>
      {/* Outer heart frame */}
      <mesh>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.18,
              bevelEnabled: true,
              bevelSegments: 3,
              bevelSize: 0.08,
              bevelThickness: 0.05,
            },
          ]}
        />
        <meshStandardMaterial
          color="#f3a6ba"
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Mirror surface */}
      <mesh position={[0, 0, 0.11]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color="#fffafa"
          roughness={0.05}
          metalness={0.75}
        />
      </mesh>

      {/* Mirror stand */}
      <mesh position={[0, -2.25, -0.05]}>
        <cylinderGeometry args={[0.5, 0.65, 0.2, 48]} />
        <meshStandardMaterial color="#e996ad" roughness={0.4} metalness={0.1} />
      </mesh>

      <mesh position={[0, -1.8, -0.05]}>
        <cylinderGeometry args={[0.14, 0.14, 0.9, 32]} />
        <meshStandardMaterial color="#e996ad" roughness={0.4} />
      </mesh>
    </group>
  );
}

function BeautyTube({
  product,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  product: Product;
  selected: boolean;
  hovered: boolean;
  onSelect: () => void;
  onHover: (value: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame(() => {
    if (!groupRef.current) return;

    const scale = selected ? 1.12 : hovered ? 1.06 : 1;

    targetScale.current.set(scale, scale, scale);

    groupRef.current.scale.lerp(targetScale.current, 0.12);
  });

  return (
    <group
      ref={groupRef}
      position={product.position}
      onPointerEnter={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "default";
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHover(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {/* Main tube */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.32, 1.5, 32]} />
        <meshStandardMaterial
          color={selected ? "#ff7fa3" : product.color}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* WARD branding */}
      <Text
        position={[0, 0.15, 0.34]}
        rotation={[0, 0, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        WARD
      </Text>

      {/* Product name */}
      <Text
        position={[0, -0.12, 0.34]}
        rotation={[0, 0, 0]}
        fontSize={0.07}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.42}
        textAlign="center"
      >
        {product.name.replace("WARD ", "")}
      </Text>

      {/* Tube cap */}
      <mesh position={[0, -0.88, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.22, 32]} />
        <meshStandardMaterial color="#e9a1b4" roughness={0.4} />
      </mesh>

      {/* Small top section */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.22, 0.27, 0.12, 32]} />
        <meshStandardMaterial
          color={selected ? "#ff7fa3" : product.color}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color="#f8eee9" roughness={0.8} />
    </mesh>
  );
}

function Scene({
  selectedProduct,
  setSelectedProduct,
  hoveredProduct,
  setHoveredProduct,
}: {
  selectedProduct: string | null;
  setSelectedProduct: (product: string) => void;
  hoveredProduct: string | null;
  setHoveredProduct: (product: string | null) => void;
}) {
  return (
    <>
      {/* Soft studio lighting */}
      <ambientLight intensity={1.4} />

      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow />

      <pointLight position={[-4, 4, 3]} intensity={1.8} color="#ffd6e2" />

      <pointLight position={[4, 2, 2]} intensity={1.2} color="#fff1f5" />

      <HeartMirror />

      {products.map((product) => (
        <BeautyTube
          key={product.name}
          product={product}
          selected={selectedProduct === product.name}
          hovered={hoveredProduct === product.name}
          onSelect={() => setSelectedProduct(product.name)}
          onHover={(value) => setHoveredProduct(value ? product.name : null)}
        />
      ))}

      <Floor />
    </>
  );
}

export default function Ward3DScene() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const selectedInfo = products.find(
    (product) => product.name === selectedProduct,
  );

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl bg-[#fff5f7] sm:h-[600px] lg:h-[700px]">
      {" "}
      {/* Product information card */}
      {selectedProduct && selectedInfo && (
        <div className="absolute left-3 right-3 top-3 z-10 w-auto max-w-[280px] rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:left-4 sm:right-auto sm:top-4 sm:p-5">
          {" "}
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#fb6f92]">
            WARD Beauty
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[#351e25]">
            {selectedInfo.name}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#7a626a]">
            {selectedInfo.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-[#351e25]">
              {selectedInfo.price}
            </span>

            <button
              type="button"
              className="rounded-full bg-[#ffc8dd] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
            >
              Add to bag
            </button>
          </div>
        </div>
      )}
      {/* Interaction hint */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/60 bg-white/75 px-4 py-2 text-[11px] font-medium text-[#7a626a] shadow-lg backdrop-blur-md sm:bottom-5 sm:px-5 sm:text-xs">
        {" "}
        Click a product to explore
      </div>
      <Canvas
        camera={{
          position: [0, 1, 7],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        shadows
        onPointerMissed={() => {
          setSelectedProduct(null);
        }}
      >
        <color attach="background" args={["#fff5f7"]} />

        <Scene
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          hoveredProduct={hoveredProduct}
          setHoveredProduct={setHoveredProduct}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          rotateSpeed={0.7}
          zoomSpeed={0.7}
          minDistance={4}
          maxDistance={9}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
