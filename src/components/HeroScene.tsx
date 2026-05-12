import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, PerspectiveCamera, Stars } from "@react-three/drei";
import { Box, Bot, Code2, Gem, Sparkles, TerminalSquare } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function WorkstationModel() {
  const group = useRef<Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = pointer.x * 0.12 + Math.sin(clock.elapsedTime * 0.35) * 0.035;
    group.current.rotation.x = -pointer.y * 0.05;
  });

  const screenColor = useMemo(() => "#081828", []);

  return (
    <group ref={group} position={[0, -0.28, 0]}>
      <mesh position={[0, -1.05, 0]} receiveShadow>
        <boxGeometry args={[4.5, 0.18, 2.3]} />
        <meshStandardMaterial color="#171a34" roughness={0.42} metalness={0.25} />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}>
        <group position={[0.52, 0.08, 0]}>
          <mesh castShadow position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.72, 48, 32]} />
            <meshStandardMaterial color="#f1f5ff" roughness={0.36} metalness={0.08} />
          </mesh>
          <mesh castShadow position={[0, 0.61, 0.42]}>
            <boxGeometry args={[1.03, 0.44, 0.08]} />
            <meshStandardMaterial color={screenColor} emissive="#0fddff" emissiveIntensity={0.18} />
          </mesh>
          <mesh position={[-0.24, 0.63, 0.48]}>
            <sphereGeometry args={[0.055, 18, 18]} />
            <meshStandardMaterial color="#5ff7ff" emissive="#5ff7ff" emissiveIntensity={1.1} />
          </mesh>
          <mesh position={[0.24, 0.63, 0.48]}>
            <sphereGeometry args={[0.055, 18, 18]} />
            <meshStandardMaterial color="#5ff7ff" emissive="#5ff7ff" emissiveIntensity={1.1} />
          </mesh>
          <mesh castShadow position={[-0.78, 0.62, 0]}>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color="#d8e2ff" roughness={0.3} />
          </mesh>
          <mesh castShadow position={[0.78, 0.62, 0]}>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color="#d8e2ff" roughness={0.3} />
          </mesh>
          <mesh castShadow position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.53, 0.7, 8, 24]} />
            <meshStandardMaterial color="#e6ecff" roughness={0.45} metalness={0.05} />
          </mesh>
          <mesh castShadow position={[-0.55, -0.1, 0.18]} rotation={[0.08, 0, 0.42]}>
            <capsuleGeometry args={[0.12, 0.58, 8, 18]} />
            <meshStandardMaterial color="#dce5ff" roughness={0.46} />
          </mesh>
          <mesh castShadow position={[0.58, -0.12, 0.18]} rotation={[0.04, 0, -0.46]}>
            <capsuleGeometry args={[0.12, 0.58, 8, 18]} />
            <meshStandardMaterial color="#dce5ff" roughness={0.46} />
          </mesh>
        </group>
      </Float>

      <group position={[-0.65, -0.66, 0.5]} rotation={[-0.2, 0.12, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.65, 0.92, 0.08]} />
          <meshStandardMaterial color="#111633" roughness={0.32} metalness={0.18} />
        </mesh>
        <mesh position={[0, -0.5, 0.42]} rotation={[1.27, 0, 0]}>
          <boxGeometry args={[1.85, 0.9, 0.06]} />
          <meshStandardMaterial color="#22285f" roughness={0.36} metalness={0.18} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingLabel({
  className,
  position,
  children
}: {
  className: string;
  position: [number, number, number];
  children: React.ReactNode;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.34}>
      <Html position={position} transform distanceFactor={5.8} className={className}>
        {children}
      </Html>
    </Float>
  );
}

export function HeroScene() {
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    setWebglReady(hasWebGL());
  }, []);

  if (!webglReady) {
    return (
      <div className="scene-fallback" role="img" aria-label="Agent workstation illustration">
        <div className="fallback-bot">
          <Bot aria-hidden="true" />
        </div>
        <div className="fallback-orbit one">OpenAI</div>
        <div className="fallback-orbit two">Gemini</div>
        <div className="fallback-orbit three">Cursor</div>
      </div>
    );
  }

  return (
    <div className="scene-wrap">
      <div className="scene-dom-art" aria-hidden="true">
        <span className="orbit-icon openai">
          <Sparkles />
          OpenAI
        </span>
        <span className="orbit-icon claude">
          <Box />
          Claude
        </span>
        <span className="orbit-icon gemini">
          <Gem />
          Gemini
        </span>
        <span className="orbit-icon cursor">
          <TerminalSquare />
          Cursor
        </span>
        <span className="orbit-icon package">
          <Code2 />
          paths
        </span>
        <div className="agent-illustration">
          <div className="agent-head">
            <span />
            <span />
            <i />
          </div>
          <div className="agent-body" />
          <div className="agent-arm left" />
          <div className="agent-arm right" />
          <div className="agent-laptop">
            <Box />
          </div>
          <div className="agent-desk" />
        </div>
      </div>
      <Canvas shadows dpr={[1, 1.6]}>
        <PerspectiveCamera makeDefault position={[0, 0.4, 5.1]} fov={42} />
        <color attach="background" args={["#040717"]} />
        <ambientLight intensity={1.05} />
        <directionalLight position={[4, 4, 4]} intensity={2.2} castShadow />
        <pointLight position={[-3, 2, 2]} color="#7d5cff" intensity={2.4} />
        <pointLight position={[2, 1, 2.8]} color="#0fdcff" intensity={1.2} />
        <Stars radius={12} depth={7} count={700} factor={1.8} fade speed={0.35} />
        <WorkstationModel />
        <FloatingLabel className="float-card openai" position={[-1.6, 1.44, 0.28]}>
          <Sparkles aria-hidden="true" />
          <span>OpenAI</span>
        </FloatingLabel>
        <FloatingLabel className="float-card claude" position={[1.72, 1.3, 0.22]}>
          <Box aria-hidden="true" />
          <span>Claude</span>
        </FloatingLabel>
        <FloatingLabel className="float-card gemini" position={[2.12, 0.25, 0.42]}>
          <Gem aria-hidden="true" />
          <span>Gemini</span>
        </FloatingLabel>
        <FloatingLabel className="float-card cursor" position={[-1.96, 0.18, 0.35]}>
          <TerminalSquare aria-hidden="true" />
          <span>Cursor</span>
        </FloatingLabel>
        <FloatingLabel className="float-card package" position={[0.1, 1.8, -0.08]}>
          <Code2 aria-hidden="true" />
          <span>paths</span>
        </FloatingLabel>
        <ContactShadows position={[0, -1.12, 0]} opacity={0.44} scale={5.8} blur={2.2} far={3} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
