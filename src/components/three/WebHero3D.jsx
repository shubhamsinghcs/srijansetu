"use client";

import { useRef, useMemo, Suspense, Component, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionValue, useTransform } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Custom Shader Material via Drei's shaderMaterial:
// Obsidian body with red (#E62429) / blue (#1D4ED8) pulsing rim-light glow
const HeroRimMaterial = shaderMaterial(
  {
    uColor: new THREE.Color("#0A0A0F"),
    uRimRed: new THREE.Color("#E62429"),
    uRimBlue: new THREE.Color("#1D4ED8"),
    uTime: 0,
    uRimPower: 2.4,
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    uniform vec3 uRimRed;
    uniform vec3 uRimBlue;
    uniform float uTime;
    uniform float uRimPower;

    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Fresnel factor for edge detection
      float fresnel = 1.0 - max(0.0, dot(normal, viewDir));
      float rim = pow(fresnel, uRimPower);

      // Gentle pulsing modulation between red primary & blue secondary highlights
      float pulse = 0.5 + 0.5 * sin(uTime * 2.2);
      vec3 rimColor = mix(uRimRed, uRimBlue, pulse * 0.45);

      vec3 finalColor = mix(uColor, rimColor, rim * 1.35);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Register custom shader material into JSX catalog
extend({ HeroRimMaterial });

// 2. Procedural Fallback Silhouette (Original abstract humanoid figure mid-swing gripping a web line)
function ProceduralWebSlinger({ materialRef }) {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, 1.25, 0.2]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <heroRimMaterial ref={materialRef} attach="material" />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.55, 0]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.22, 0.95, 8]} />
        <heroRimMaterial attach="material" />
      </mesh>

      {/* Right arm reaching up to web */}
      <mesh position={[0.42, 1.15, 0.25]} rotation={[-0.6, 0, -0.35]}>
        <cylinderGeometry args={[0.09, 0.07, 0.85, 8]} />
        <heroRimMaterial attach="material" />
      </mesh>

      {/* Left arm swept back */}
      <mesh position={[-0.42, 0.65, -0.25]} rotation={[0.65, 0, 0.45]}>
        <cylinderGeometry args={[0.09, 0.07, 0.85, 8]} />
        <heroRimMaterial attach="material" />
      </mesh>

      {/* Right leg forward */}
      <mesh position={[0.26, -0.2, 0.3]} rotation={[-0.55, 0, -0.1]}>
        <cylinderGeometry args={[0.13, 0.09, 1.05, 8]} />
        <heroRimMaterial attach="material" />
      </mesh>

      {/* Left leg back */}
      <mesh position={[-0.26, -0.3, -0.35]} rotation={[0.75, 0, 0.18]}>
        <cylinderGeometry args={[0.13, 0.09, 1.05, 8]} />
        <heroRimMaterial attach="material" />
      </mesh>

      {/* Web line extending upward from gripping hand */}
      <mesh position={[0.65, 2.3, 0.45]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.012, 0.012, 2.4, 6]} />
        <meshBasicMaterial color="#E62429" />
      </mesh>
    </group>
  );
}

// 3. GLB Model Loader with Custom Shader
function SlingerModel({ materialRef }) {
  const { scene } = useGLTF("/models/web-hero.glb");
  const cloned = useMemo(() => {
    if (!scene) return null;
    const c = scene.clone();
    return c;
  }, [scene]);

  useEffect(() => {
    if (!cloned || !materialRef.current) return;
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = materialRef.current;
      }
    });
  }, [cloned, materialRef]);

  if (!cloned) return <ProceduralWebSlinger materialRef={materialRef} />;
  return <primitive object={cloned} />;
}

// Error Boundary for GLB parsing resilience
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// 4. Swinging Controller: GSAP ScrollTrigger + Idle Rotation + Framer Motion Cursor Tilt
function SceneContent({ motionX, motionY, scrollProgressRef }) {
  const heroGroupRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Pulse custom shader material uniform
    if (materialRef.current) {
      materialRef.current.uTime = time;
    }

    if (!heroGroupRef.current) return;

    // Scroll progress driven by GSAP ScrollTrigger (0 to 1)
    const scrollVal = scrollProgressRef.current || 0.5;

    // 1. GSAP Scroll-driven swing arc (harmonic pendulum curve)
    const swingAngle = Math.sin((scrollVal - 0.5) * Math.PI) * 0.55;
    const idleSway = Math.sin(time * 1.4) * 0.06;
    const totalAngle = swingAngle + idleSway;

    // Arc path coordinates
    const arcX = Math.sin(totalAngle) * 1.8;
    const arcY = -Math.cos(totalAngle) * 0.5 + 0.2;

    // 2. Idle auto-rotation when not aggressively scrolling
    const idleRotY = Math.sin(time * 0.6) * 0.25;

    // 3. Subtle cursor tilt from Framer Motion coordinates
    const tiltX = motionY.get();
    const tiltY = motionX.get() + idleRotY;

    // Smooth lerp for silky response
    heroGroupRef.current.position.x = THREE.MathUtils.lerp(heroGroupRef.current.position.x, arcX, 0.07);
    heroGroupRef.current.position.y = THREE.MathUtils.lerp(heroGroupRef.current.position.y, arcY, 0.07);
    heroGroupRef.current.rotation.z = THREE.MathUtils.lerp(heroGroupRef.current.rotation.z, -totalAngle * 0.85, 0.07);
    heroGroupRef.current.rotation.y = THREE.MathUtils.lerp(heroGroupRef.current.rotation.y, tiltY, 0.06);
    heroGroupRef.current.rotation.x = THREE.MathUtils.lerp(heroGroupRef.current.rotation.x, -tiltX, 0.06);
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* Lighting: ambient + blue/red edge lights */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 2]} intensity={0.7} color="#F5F5F5" />
      <pointLight position={[-3, -2, -2]} intensity={2.2} color="#E62429" distance={10} />
      <pointLight position={[3, 3, -1]} intensity={1.8} color="#1D4ED8" distance={10} />

      {/* Shared Custom Shader Instance */}
      <heroRimMaterial ref={materialRef} attach="material" />

      {/* Floating web-slinger entity */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={heroGroupRef} scale={1.2}>
          <ModelErrorBoundary fallback={<ProceduralWebSlinger materialRef={materialRef} />}>
            <Suspense fallback={<ProceduralWebSlinger materialRef={materialRef} />}>
              <SlingerModel materialRef={materialRef} />
            </Suspense>
          </ModelErrorBoundary>
        </group>
      </Float>
    </group>
  );
}

// 5. Main Canvas Component exported for About.jsx
export default function WebHero3D({ className = "" }) {
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0.5);

  // Framer Motion motion values for cursor tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useTransform(mouseX, [-1, 1], [-0.35, 0.35]);
  const tiltY = useTransform(mouseY, [-1, 1], [-0.25, 0.25]);

  useEffect(() => {
    // Track mouse position over container for Framer Motion tilt
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // GSAP ScrollTrigger driving the swing arc through the About section
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      st.kill();
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[360px] sm:h-[440px] md:h-[500px] select-none ${className}`}
    >
      {/* Background Danger Sense Glow ring behind canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial-gradient from-spidey-red/20 via-spidey-blue/10 to-transparent blur-2xl" />
      </div>

      <Canvas
        camera={{ position: [0, 0.5, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent
            motionX={tiltX}
            motionY={tiltY}
            scrollProgressRef={scrollProgressRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/web-hero.glb");
