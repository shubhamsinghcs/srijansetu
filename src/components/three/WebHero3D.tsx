"use client";

import { useRef, useMemo, Suspense, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

interface WebHero3DProps {
  scrollYProgress?: MotionValue<number>;
  className?: string;
}

// 1. Custom GLSL Shader for Red Energy Rim-Lighting on Dark Obsidian Silhouette
function createRimShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color("#0A0A0F") },
      uRimColor: { value: new THREE.Color("#E32636") },
      uRimPower: { value: 2.2 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform vec3 uRimColor;
      uniform float uRimPower;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = 1.0 - max(0.0, dot(normal, viewDir));
        float rim = pow(fresnel, uRimPower);
        vec3 finalColor = mix(uColor, uRimColor, rim);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    transparent: false,
  });
}

// 2. Procedural Fallback Silhouette (Original Stylized Humanoid Mid-Swing)
function ProceduralWebSlinger({ material }: { material: THREE.Material }) {
  return (
    <group>
      {/* Head */}
      <mesh material={material} position={[0, 1.25, 0.2]}>
        <sphereGeometry args={[0.26, 16, 16]} />
      </mesh>

      {/* Torso */}
      <mesh material={material} position={[0, 0.55, 0]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.22, 0.95, 8]} />
      </mesh>

      {/* Right arm reaching up to web */}
      <mesh material={material} position={[0.42, 1.15, 0.25]} rotation={[-0.6, 0, -0.35]}>
        <cylinderGeometry args={[0.09, 0.07, 0.85, 8]} />
      </mesh>

      {/* Left arm swept back */}
      <mesh material={material} position={[-0.42, 0.65, -0.25]} rotation={[0.65, 0, 0.45]}>
        <cylinderGeometry args={[0.09, 0.07, 0.85, 8]} />
      </mesh>

      {/* Right leg forward */}
      <mesh material={material} position={[0.26, -0.2, 0.3]} rotation={[-0.55, 0, -0.1]}>
        <cylinderGeometry args={[0.13, 0.09, 1.05, 8]} />
      </mesh>

      {/* Left leg back */}
      <mesh material={material} position={[-0.26, -0.3, -0.35]} rotation={[0.75, 0, 0.18]}>
        <cylinderGeometry args={[0.13, 0.09, 1.05, 8]} />
      </mesh>

      {/* Web line extending from hand */}
      <mesh position={[0.65, 2.3, 0.45]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.012, 0.012, 2.4, 6]} />
        <meshBasicMaterial color="#E32636" />
      </mesh>
    </group>
  );
}

// 3. GLB Model Loader
function SlingerModel({ material }: { material: THREE.Material }) {
  const { scene } = useGLTF("/models/web-hero.glb");
  const cloned = useMemo(() => {
    if (!scene) return null;
    const c = scene.clone();
    c.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        (node as THREE.Mesh).material = material;
      }
    });
    return c;
  }, [scene, material]);

  if (!cloned) return <ProceduralWebSlinger material={material} />;
  return <primitive object={cloned} />;
}

// Simple Error Boundary for 3D fallback
class ModelErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
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

// 4. Swinging Controller with Scroll Arc & Mouse Parallax
function SceneContent({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const pivotRef = useRef<THREE.Group>(null);
  const heroGroupRef = useRef<THREE.Group>(null);
  const rimShader = useMemo(() => createRimShaderMaterial(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollVal = scrollYProgress ? scrollYProgress.get() : 0.5;

    // Pendulum swing calculation linked to scroll and idle breathing
    const scrollAngle = Math.sin((scrollVal - 0.5) * Math.PI) * 0.45;
    const idleSwing = Math.sin(time * 1.2) * 0.08;
    const totalAngle = scrollAngle + idleSwing;

    // Curved swing trajectory
    const posX = Math.sin(totalAngle) * 1.6;
    const posY = -Math.cos(totalAngle) * 0.6 + 0.3;

    // Mouse tilt calculation
    const targetTiltX = -state.pointer.y * 0.3;
    const targetTiltY = state.pointer.x * 0.45 + Math.sin(time * 0.3) * 0.2;

    if (heroGroupRef.current) {
      heroGroupRef.current.position.x = THREE.MathUtils.lerp(heroGroupRef.current.position.x, posX, 0.06);
      heroGroupRef.current.position.y = THREE.MathUtils.lerp(heroGroupRef.current.position.y, posY, 0.06);
      heroGroupRef.current.rotation.z = THREE.MathUtils.lerp(heroGroupRef.current.rotation.z, -totalAngle * 0.8, 0.06);
      heroGroupRef.current.rotation.y = THREE.MathUtils.lerp(heroGroupRef.current.rotation.y, targetTiltY, 0.05);
      heroGroupRef.current.rotation.x = THREE.MathUtils.lerp(heroGroupRef.current.rotation.x, targetTiltX, 0.05);
    }
  });

  return (
    <group ref={pivotRef} position={[0, -0.2, 0]}>
      {/* Ambient and Red Accent Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={1.8} color="#E32636" distance={8} />
      <pointLight position={[2, 3, -1]} intensity={1.5} color="#1B3A6B" distance={8} />

      {/* Floating web-slinger entity */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={heroGroupRef} scale={1.2}>
          <ModelErrorBoundary fallback={<ProceduralWebSlinger material={rimShader} />}>
            <Suspense fallback={<ProceduralWebSlinger material={rimShader} />}>
              <SlingerModel material={rimShader} />
            </Suspense>
          </ModelErrorBoundary>
        </group>
      </Float>
    </group>
  );
}

// 5. Main Canvas Wrapper
export default function WebHero3D({ scrollYProgress, className = "" }: WebHero3DProps) {
  return (
    <div className={`relative w-full h-[360px] sm:h-[440px] md:h-[500px] select-none ${className}`}>
      {/* Background soft red energy ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial-gradient from-spidey-red/20 via-transparent to-transparent blur-2xl" />
      </div>

      <Canvas
        camera={{ position: [0, 0.5, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/web-hero.glb");
