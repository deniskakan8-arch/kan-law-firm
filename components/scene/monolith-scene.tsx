'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Environment, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { sceneState } from '@/lib/motion'

const GOLD = '#B89C72'

type Slab = {
  pos: [number, number, number]
  size: [number, number, number]
  dir: number
  rot: number
  travel: number
}

const SLABS: Slab[] = [
  { pos: [-0.47, 0.05, 0.4], size: [0.92, 3.8, 0.42], dir: -1, rot: 0.04, travel: 2.6 },
  { pos: [0.47, -0.1, 0.4], size: [0.92, 4.1, 0.42], dir: 1, rot: -0.04, travel: 2.6 },
  { pos: [-1.65, -0.35, -0.5], size: [0.8, 3.1, 0.4], dir: -1, rot: 0.28, travel: 3.4 },
  { pos: [1.7, 0.3, -0.6], size: [0.86, 3.4, 0.4], dir: 1, rot: -0.26, travel: 3.4 },
  { pos: [-2.9, 0.5, -1.6], size: [0.7, 2.6, 0.36], dir: -1, rot: 0.5, travel: 4.2 },
  { pos: [3.0, -0.55, -1.7], size: [0.72, 2.9, 0.36], dir: 1, rot: -0.48, travel: 4.2 },
]

const damp = THREE.MathUtils.damp

function Monolith({ slab, index, progress }: { slab: Slab; index: number; progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    const g = ref.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = progress.current
    g.position.x = slab.pos[0] + slab.dir * p * slab.travel
    g.position.y = slab.pos[1] + Math.sin(t * 0.25 + index) * 0.06
    g.position.z = slab.pos[2] - p * 0.6 * Math.abs(slab.dir)
    g.rotation.y = slab.rot + slab.dir * p * 0.55 + Math.sin(t * 0.18 + index * 1.7) * 0.03
    g.rotation.z = Math.sin(t * 0.12 + index) * 0.01
  })

  return (
    <group ref={ref} position={slab.pos}>
      <RoundedBox args={slab.size} radius={0.015} smoothness={2}>
        <meshPhysicalMaterial
          color="#0b0c10"
          metalness={0.6}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={0.6}
        />
        <Edges threshold={20} color={GOLD} transparent opacity={0.28} />
      </RoundedBox>
    </group>
  )
}

function Seam({ progress }: { progress: React.MutableRefObject<number> }) {
  const core = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const p = progress.current
    const t = state.clock.elapsedTime
    if (core.current) {
      core.current.scale.x = 1 + p * 18
      ;(core.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + p * 0.5 + Math.sin(t * 1.4) * 0.05
    }
    if (glow.current) {
      glow.current.scale.x = 1 + p * 6
      ;(glow.current.material as THREE.MeshBasicMaterial).opacity = 0.05 + p * 0.18
    }
  })

  return (
    <group position={[0, 0, -0.2]}>
      <mesh ref={glow}>
        <planeGeometry args={[0.6, 5.5]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.05} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh ref={core}>
        <planeGeometry args={[0.02, 6]} />
        <meshBasicMaterial color="#e6d3b0" transparent opacity={0.4} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  )
}

function Ring({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * 0.04
    ref.current.rotation.x = 1.25 + Math.sin(state.clock.elapsedTime * 0.1) * 0.08 - progress.current * 0.5
    const s = 1 + progress.current * 0.35
    ref.current.scale.setScalar(s)
  })
  return (
    <mesh ref={ref} position={[0, -0.2, -2.2]}>
      <torusGeometry args={[2.6, 0.006, 8, 220]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.4} toneMapped={false} />
    </mesh>
  )
}

function Composition() {
  const group = useRef<THREE.Group>(null)
  const light = useRef<THREE.PointLight>(null)
  const progress = useRef(0)
  const { viewport, camera } = useThree()
  const offsetX = viewport.width > 9 ? viewport.width * 0.17 : 0

  useFrame((_, delta) => {
    progress.current = damp(progress.current, sceneState.progress, 4, delta)
    const { x, y } = sceneState.pointer
    const p = progress.current

    if (group.current) {
      group.current.rotation.y = damp(group.current.rotation.y, x * 0.18, 2.5, delta)
      group.current.rotation.x = damp(group.current.rotation.x, -y * 0.08, 2.5, delta)
      group.current.position.x = damp(group.current.position.x, offsetX * (1 - p), 3, delta)
    }
    if (light.current) {
      light.current.position.x = damp(light.current.position.x, x * 5 + offsetX, 3, delta)
      light.current.position.y = damp(light.current.position.y, y * 3, 3, delta)
    }
    camera.position.z = damp(camera.position.z, 10 - p * 3, 3, delta)
    camera.position.y = damp(camera.position.y, p * 0.4, 3, delta)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <pointLight ref={light} position={[0, 0, 3]} intensity={18} distance={12} decay={1.6} color={GOLD} />
      <group ref={group} position={[offsetX, 0, 0]}>
        <Ring progress={progress} />
        <Seam progress={progress} />
        {SLABS.map((slab, i) => (
          <Monolith key={i} slab={slab} index={i} progress={progress} />
        ))}
      </group>
    </>
  )
}

export default function MonolithScene({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <fog attach="fog" args={['#0A0A0A', 8, 17]} />
      <ambientLight intensity={0.08} />
      <directionalLight position={[-4, 5, 3]} intensity={0.6} color="#c9d3e6" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} color={GOLD} position={[0, 4, -4]} scale={[10, 0.4, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#7a8aa8" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.6} color={GOLD} position={[6, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 0.25, 1]} />
      </Environment>
      <Composition />
    </Canvas>
  )
}
