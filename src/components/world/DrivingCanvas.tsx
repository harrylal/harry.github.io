"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, Text } from "@react-three/drei";
import {
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";
import * as THREE from "three";

const COLORS = {
  sky: "#F3EFE6",
  ground: "#E8E2D6",
  grid: "#D6CFC3",
  body: "#FFFBF5",
  bodyShade: "#E0E7FF",
  accent: "#7C3AED",
  accentBright: "#A78BFA",
  panel: "#312E81",
  eye: "#0E7490",
  eyeGlow: "#22D3EE",
  antenna: "#F472B6",
  wheel: "#1E1B4B",
  wheelHub: "#A78BFA",
};

type Keys = {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  brake: boolean;
};

export interface SignDef {
  id: string;
  label: string;
  pos: [number, number, number];
  color: string;
}

export const SIGNS: SignDef[] = [
  { id: "experience", label: "EXPERIENCE", pos: [-11, 0, -9], color: "#C25E2E" },
  { id: "education", label: "EDUCATION", pos: [12, 0, -7], color: "#1D5C4A" },
  { id: "work", label: "PROJECTS", pos: [11, 0, 12], color: "#D97706" },
  { id: "contact", label: "CONTACT", pos: [-12, 0, 11], color: "#C25E2E" },
];

const PROXIMITY_SQ = 18;

function Wheel({
  position,
  wheelRef,
}: {
  position: [number, number, number];
  wheelRef: (m: THREE.Mesh | null) => void;
}) {
  return (
    <group position={position}>
      <mesh ref={wheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.3, 18]} />
        <meshStandardMaterial color={COLORS.wheel} roughness={0.7} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.32, 12]} />
        <meshStandardMaterial color={COLORS.wheelHub} roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

function useKeys(): React.RefObject<Keys> {
  const keys = useRef<Keys>({
    forward: false,
    back: false,
    left: false,
    right: false,
    brake: false,
  });
  useEffect(() => {
    const set = (code: string, val: boolean) => {
      switch (code) {
        case "ArrowUp":
        case "KeyW":
          keys.current.forward = val;
          break;
        case "ArrowDown":
        case "KeyS":
          keys.current.back = val;
          break;
        case "ArrowLeft":
        case "KeyA":
          keys.current.left = val;
          break;
        case "ArrowRight":
        case "KeyD":
          keys.current.right = val;
          break;
        case "Space":
          keys.current.brake = val;
          break;
      }
    };
    const down = (e: KeyboardEvent) => set(e.code, true);
    const up = (e: KeyboardEvent) => set(e.code, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  return keys;
}

function Rover({
  onNear,
  onMode,
}: {
  onNear: (sign: SignDef | null) => void;
  onMode: (isCar: boolean) => void;
}) {
  const body = useRef<RapierRigidBody>(null);
  const keys = useKeys();
  const { camera } = useThree();
  const wheels = useRef<(THREE.Mesh | null)[]>([]);
  const head = useRef<THREE.Group>(null);
  const antenna = useRef<THREE.Mesh>(null);
  const lastNear = useRef<string | null>(null);

  const morph = useRef(0);
  const target = useRef(0);
  const lastMode = useRef(false);
  const idleT = useRef(0);
  const visual = useRef<THREE.Group>(null);
  const roverParts = useRef<THREE.Group>(null);
  const carParts = useRef<THREE.Group>(null);
  const midWheels = useRef<THREE.Group>(null);
  const flash = useRef<THREE.Mesh>(null);
  const chassis = useRef<THREE.Mesh>(null);

  const v = useMemo(
    () => ({
      quat: new THREE.Quaternion(),
      fwd: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      camPos: new THREE.Vector3(20, 16, 20),
      roverCol: new THREE.Color(COLORS.body),
      carCol: new THREE.Color(COLORS.accent),
    }),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "KeyE") {
        e.preventDefault();
        target.current = target.current > 0.5 ? 0 : 1;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useFrame((state, dt) => {
    const rb = body.current;
    if (!rb) return;
    const delta = Math.min(dt, 0.05);
    const { forward, back, left, right, brake } = keys.current;

    const q = rb.rotation();
    v.quat.set(q.x, q.y, q.z, q.w);
    v.fwd.set(0, 0, -1).applyQuaternion(v.quat);

    const lv = rb.linvel();
    v.vel.set(lv.x, lv.y, lv.z);
    const speed = v.vel.dot(v.fwd);

    const isCar = morph.current > 0.5;
    const engine = (forward ? 1 : 0) - (back ? 1 : 0);
    if (engine !== 0 && !brake) {
      const force = (isCar ? 150 : 115) * engine * delta;
      rb.applyImpulse({ x: v.fwd.x * force, y: 0, z: v.fwd.z * force }, true);
    }
    if (brake) {
      rb.setLinvel({ x: lv.x * 0.82, y: lv.y, z: lv.z * 0.82 }, true);
    }

    const steer = (left ? 1 : 0) - (right ? 1 : 0);
    const moving = Math.abs(speed) > 0.3;
    const dir = speed >= 0 ? 1 : -1;
    const targetYaw = moving ? steer * 2.8 * dir : steer * 1.1;
    const av = rb.angvel();
    rb.setAngvel({ x: 0, y: THREE.MathUtils.lerp(av.y, targetYaw, 0.2), z: 0 }, true);

    const maxSpeed = isCar ? 34 : 26;
    const planarLen = Math.hypot(v.vel.x, v.vel.z);
    if (planarLen > maxSpeed) {
      const s = maxSpeed / planarLen;
      rb.setLinvel({ x: v.vel.x * s, y: lv.y, z: v.vel.z * s }, true);
    }

    for (const w of wheels.current) {
      if (w) w.rotation.x -= speed * delta * 1.6;
    }

    morph.current += (target.current - morph.current) * Math.min(1, delta * 4);
    const m = morph.current;
    const pulse = Math.sin(THREE.MathUtils.clamp(m, 0, 1) * Math.PI);
    if (visual.current) {
      visual.current.rotation.y = pulse * Math.PI * 1.4;
      visual.current.position.y = pulse * 0.55;
    }
    if (roverParts.current) {
      roverParts.current.scale.setScalar(Math.max(0.001, 1 - m));
      roverParts.current.visible = m < 0.99;
    }
    if (carParts.current) {
      carParts.current.scale.setScalar(Math.max(0.001, m));
      carParts.current.visible = m > 0.01;
    }
    if (midWheels.current) {
      midWheels.current.scale.setScalar(Math.max(0.001, 1 - m));
      midWheels.current.visible = m < 0.99;
    }
    if (flash.current) {
      flash.current.scale.setScalar(0.4 + pulse * 2.2);
      flash.current.visible = pulse > 0.02;
      const mat = flash.current.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse * 0.7;
    }
    if (chassis.current) {
      const mat = chassis.current.material as THREE.MeshStandardMaterial;
      mat.color.copy(v.roverCol).lerp(v.carCol, m);
      chassis.current.scale.y = 1 - m * 0.35;
    }

    const t = state.clock.elapsedTime;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.25;
    if (antenna.current) antenna.current.rotation.z = Math.sin(t * 4) * 0.18;

    if (isCar !== lastMode.current) {
      lastMode.current = isCar;
      onMode(isCar);
    }

    const driving = forward || back || left || right || Math.abs(speed) > 1;
    if (driving) idleT.current = 0;
    else idleT.current += delta;

    const p = rb.translation();
    const camDist = isCar ? 13 : 11;
    // When idle, slowly orbit the camera for a living, cinematic background.
    const orbit = idleT.current > 1 ? (idleT.current - 1) * 0.12 : 0;
    const cosO = Math.cos(orbit);
    const sinO = Math.sin(orbit);
    const bx = -v.fwd.x;
    const bz = -v.fwd.z;
    const rx = bx * cosO - bz * sinO;
    const rz = bx * sinO + bz * cosO;
    v.camPos.set(p.x + rx * camDist, p.y + 6.5, p.z + rz * camDist);
    camera.position.lerp(v.camPos, 1 - Math.pow(0.0015, delta));
    camera.lookAt(p.x, p.y + 1, p.z);

    let near: SignDef | null = null;
    for (const s of SIGNS) {
      const dx = p.x - s.pos[0];
      const dz = p.z - s.pos[2];
      if (dx * dx + dz * dz < PROXIMITY_SQ) {
        near = s;
        break;
      }
    }
    const nearId = near ? near.id : null;
    if (nearId !== lastNear.current) {
      lastNear.current = nearId;
      onNear(near);
    }
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={[0, 1.2, 7]}
      enabledRotations={[false, true, false]}
      linearDamping={0.4}
      angularDamping={2.5}
      canSleep={false}
    >
      <CuboidCollider args={[0.95, 0.5, 1.5]} />

      <group ref={visual}>
        <mesh ref={chassis} position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.5, 2.7]} />
          <meshStandardMaterial color={COLORS.body} roughness={0.45} />
        </mesh>
        <mesh position={[0, -0.28, 0]}>
          <boxGeometry args={[1.5, 0.25, 2.4]} />
          <meshStandardMaterial color={COLORS.panel} roughness={0.5} />
        </mesh>

        <mesh ref={flash} position={[0, 0.2, 0]} visible={false}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color={COLORS.eyeGlow} transparent opacity={0} />
        </mesh>

        <group ref={roverParts}>
          <mesh position={[0, 0.3, 0.45]} rotation={[0.12, 0, 0]} castShadow>
            <boxGeometry args={[1.4, 0.08, 1.5]} />
            <meshStandardMaterial color={COLORS.bodyShade} roughness={0.3} metalness={0.3} />
          </mesh>
          {[-0.45, 0, 0.45].map((x) => (
            <mesh key={x} position={[x, 0.345, 0.45]} rotation={[0.12, 0, 0]}>
              <boxGeometry args={[0.04, 0.02, 1.4]} />
              <meshStandardMaterial color={COLORS.accent} />
            </mesh>
          ))}

          <group ref={head} position={[0, 0.45, -0.85]}>
            <mesh position={[0, 0.18, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.13, 0.45, 12]} />
              <meshStandardMaterial color={COLORS.accentBright} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[0.6, 0.34, 0.3]} />
              <meshStandardMaterial color={COLORS.body} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.5, -0.17]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.1, 20]} />
              <meshStandardMaterial color={COLORS.eye} />
            </mesh>
            <mesh position={[0, 0.5, -0.23]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={COLORS.eyeGlow}
                emissive={COLORS.eyeGlow}
                emissiveIntensity={0.9}
              />
            </mesh>
            <mesh position={[0.03, 0.53, -0.29]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>

          <mesh ref={antenna} position={[-0.6, 0.5, 0.9]} castShadow>
            <cylinderGeometry args={[0.02, 0.03, 0.7, 8]} />
            <meshStandardMaterial color={COLORS.antenna} />
          </mesh>
          <mesh position={[-0.6, 0.88, 0.9]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color={COLORS.antenna}
              emissive={COLORS.antenna}
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>

        <group ref={carParts} scale={0.001} visible={false}>
          <mesh position={[0, 0.42, -0.1]} castShadow>
            <boxGeometry args={[1.45, 0.45, 1.6]} />
            <meshStandardMaterial color={COLORS.panel} roughness={0.15} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.45, -0.92]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[1.25, 0.5, 0.05]} />
            <meshStandardMaterial
              color={COLORS.eyeGlow}
              emissive={COLORS.eyeGlow}
              emissiveIntensity={0.5}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0, 0.05, -1.45]} castShadow>
            <boxGeometry args={[1.6, 0.3, 0.5]} />
            <meshStandardMaterial color={COLORS.accentBright} roughness={0.25} metalness={0.2} />
          </mesh>
          <mesh position={[0.55, 0.1, -1.66]}>
            <boxGeometry args={[0.3, 0.14, 0.06]} />
            <meshStandardMaterial color="#FDE68A" emissive="#FDE68A" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[-0.55, 0.1, -1.66]}>
            <boxGeometry args={[0.3, 0.14, 0.06]} />
            <meshStandardMaterial color="#FDE68A" emissive="#FDE68A" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[0, 0.6, 1.35]} castShadow>
            <boxGeometry args={[1.5, 0.06, 0.4]} />
            <meshStandardMaterial color={COLORS.accent} roughness={0.3} />
          </mesh>
        </group>

        {([
          [0.95, 1.05],
          [-0.95, 1.05],
          [0.95, -1.05],
          [-0.95, -1.05],
        ] as [number, number][]).map(([x, z], i) => (
          <Wheel
            key={i}
            position={[x, -0.42, z]}
            wheelRef={(mesh) => (wheels.current[i] = mesh)}
          />
        ))}
        <group ref={midWheels}>
          <Wheel position={[0.95, -0.42, 0]} wheelRef={(mesh) => (wheels.current[4] = mesh)} />
          <Wheel position={[-0.95, -0.42, 0]} wheelRef={(mesh) => (wheels.current[5] = mesh)} />
        </group>
      </group>
    </RigidBody>
  );
}

function Signpost({
  sign,
  onPick,
}: {
  sign: SignDef;
  onPick: (id: string) => void;
}) {
  return (
    <group position={sign.pos}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 2, 10]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh
          position={[0, 2.4, 0]}
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            onPick(sign.id);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "")}
        >
          <boxGeometry args={[2.6, 1.1, 0.18]} />
          <meshStandardMaterial color={sign.color} roughness={0.3} />
        </mesh>
      </RigidBody>
      <Text
        position={[0, 2.4, 0.12]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {sign.label}
      </Text>
    </group>
  );
}

function Crate({ position, size = 0.9, color = "#F97316" }: { position: [number, number, number]; size?: number; color?: string }) {
  return (
    <RigidBody position={position} colliders="cuboid" restitution={0.2} friction={0.8}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </RigidBody>
  );
}

function Ball({ position, color = "#0891B2" }: { position: [number, number, number]; color?: string }) {
  return (
    <RigidBody position={position} colliders="ball" restitution={0.6}>
      <mesh castShadow>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
    </RigidBody>
  );
}

function World({
  onNear,
  onPick,
  onMode,
}: {
  onNear: (s: SignDef | null) => void;
  onPick: (id: string) => void;
  onMode: (isCar: boolean) => void;
}) {
  const BOUND = 22;
  const WALL_H = 1.4;
  return (
    <>
      <color attach="background" args={[COLORS.sky]} />
      <fog attach="fog" args={[COLORS.sky, 30, 70]} />

      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#ffffff", COLORS.ground, 0.5]} />
      <directionalLight
        position={[12, 18, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      <Physics gravity={[0, -22, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[BOUND, 0.5, BOUND]} position={[0, -0.5, 0]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[BOUND * 2, BOUND * 2]} />
            <meshStandardMaterial color={COLORS.ground} roughness={1} />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[BOUND, WALL_H, 0.5]} position={[0, WALL_H, -BOUND]} />
          <CuboidCollider args={[BOUND, WALL_H, 0.5]} position={[0, WALL_H, BOUND]} />
          <CuboidCollider args={[0.5, WALL_H, BOUND]} position={[-BOUND, WALL_H, 0]} />
          <CuboidCollider args={[0.5, WALL_H, BOUND]} position={[BOUND, WALL_H, 0]} />
        </RigidBody>

        <Rover onNear={onNear} onMode={onMode} />

        {SIGNS.map((s) => (
          <Signpost key={s.id} sign={s} onPick={onPick} />
        ))}

        <Crate position={[2, 1, -2]} color="#F97316" />
        <Crate position={[2.9, 1, -2]} color="#FBBF24" />
        <Crate position={[2.45, 2, -2]} color="#F472B6" />
        <Crate position={[-4, 1, 0]} color="#34D399" />
        <Crate position={[-4, 2, 0]} color="#A78BFA" />
        <Crate position={[5, 1, 4]} size={1.1} color="#38BDF8" />
        <Crate position={[-2, 1, 5]} color="#FB7185" />
        <Ball position={[0, 1, -5]} color="#0891B2" />
        <Ball position={[6, 1, -3]} color="#7C3AED" />
        <Ball position={[-6, 1, 4]} color="#F59E0B" />
      </Physics>

      <Grid
        position={[0, 0.02, 0]}
        args={[BOUND * 2, BOUND * 2]}
        cellSize={1}
        cellThickness={0.6}
        cellColor={COLORS.grid}
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#94A3B8"
        fadeDistance={55}
        fadeStrength={1.5}
        followCamera={false}
      />
    </>
  );
}

export default function DrivingCanvas({
  onNear,
  onPick,
  onMode,
}: {
  onNear: (s: SignDef | null) => void;
  onPick: (id: string) => void;
  onMode: (isCar: boolean) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [18, 14, 18], fov: 46, near: 0.1, far: 200 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <World onNear={onNear} onPick={onPick} onMode={onMode} />
      </Suspense>
    </Canvas>
  );
}
