import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ErrorInfo, ReactNode, RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

type HeroSceneProps = { active?: boolean }
type Point = [number, number, number]

const CYAN = '#69e4f7'
const VIOLET = '#9b83f6'
const nodes: Point[] = [
  [-2.5, -0.45, -1.0],
  [-2.4, -0.2, 1.4],
  [-0.7, -0.7, 2.15],
  [2.35, 0.1, 1.3],
  [2.5, -0.35, -1.4],
  [0.3, 0.45, -2.15],
]

const routes: Point[][] = [
  [[-1.35, 0.05, -0.55], [-1.9, 0.05, -0.55], [-2.2, -0.25, -1.0], nodes[0]],
  [[-1.35, -0.32, 0.55], [-1.9, -0.32, 0.55], [-2.2, -0.2, 1.4], nodes[1]],
  [[-0.65, -0.68, 0.86], [-0.65, -0.68, 1.45], nodes[2]],
  [[1.35, 0.05, 0.5], [1.9, 0.05, 0.5], [2.1, 0.1, 1.3], nodes[3]],
  [[1.35, -0.32, -0.55], [1.95, -0.32, -0.55], [2.15, -0.35, -1.4], nodes[4]],
  [[0.3, 0.42, -0.86], [0.3, 0.42, -1.4], nodes[5]],
]

function roundedOutline(width: number, depth: number, y: number): Point[] {
  const radius = 0.13
  const halfW = width / 2
  const halfD = depth / 2
  const corners = [
    [halfW - radius, halfD - radius, 0],
    [-halfW + radius, halfD - radius, Math.PI / 2],
    [-halfW + radius, -halfD + radius, Math.PI],
    [halfW - radius, -halfD + radius, Math.PI * 1.5],
  ]
  const points: Point[] = []
  for (const [x, z, start] of corners) {
    for (let step = 0; step <= 6; step++) {
      const angle = start + (step / 6) * Math.PI / 2
      points.push([x + Math.cos(angle) * radius, y, z + Math.sin(angle) * radius])
    }
  }
  points.push(points[0])
  return points
}

function Platform({ y, index }: { y: number; index: number }) {
  const width = 2.75 - index * 0.12
  const depth = 1.88 - index * 0.09
  const outline = useMemo(() => roundedOutline(width, depth, y + 0.057), [width, depth, y])

  return (
    <group>
      <RoundedBox args={[width, 0.105, depth]} position={[0, y, 0]} radius={0.052} smoothness={3}>
        <meshStandardMaterial color="#101d32" metalness={0.55} roughness={0.4} />
      </RoundedBox>
      <Line points={outline} color={CYAN} lineWidth={0.95} transparent opacity={index === 2 ? 0.9 : 0.48} />
      <Line points={[[-width / 2 + 0.3, y + 0.06, -depth / 2 + 0.23], [width / 2 - 0.3, y + 0.06, -depth / 2 + 0.23]]} color={CYAN} lineWidth={0.65} transparent opacity={0.25} />
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-width / 2 + 0.32 + i * 0.14, y, depth / 2 + 0.007]}>
          <sphereGeometry args={[0.024, 6, 6]} />
          <meshBasicMaterial color={i === 2 ? VIOLET : CYAN} />
        </mesh>
      ))}
    </group>
  )
}

function NetworkNode({ position, index }: { position: Point; index: number }) {
  const color = index % 3 === 0 ? VIOLET : CYAN
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.24, 0.24, 0.06, 6]} />
        <meshStandardMaterial color="#142238" metalness={0.65} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.038, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.21, 0.224, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <octahedronGeometry args={[0.068, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Line points={[[0, 0.1, 0], [0, 0.34, 0]]} color={color} lineWidth={0.6} transparent opacity={0.3} />
    </group>
  )
}

function TransferRoute({ points, index, reducedMotion }: { points: Point[]; index: number; reducedMotion: boolean }) {
  const packetRef = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)), false, 'centripetal'), [points])
  const linePoints = useMemo(() => curve.getPoints(32), [curve])
  const initialPosition = useMemo(() => curve.getPoint((index * 0.17) % 1), [curve, index])

  useFrame(({ clock }) => {
    if (!packetRef.current || reducedMotion) return
    const progress = (clock.elapsedTime * 0.11 + index * 0.17) % 1
    curve.getPoint(progress, packetRef.current.position)
  })

  return (
    <group>
      <Line points={linePoints} color={index % 3 === 0 ? VIOLET : CYAN} lineWidth={0.7} transparent opacity={0.3} />
      <mesh ref={packetRef} position={initialPosition}>
        <sphereGeometry args={[0.033, 8, 8]} />
        <meshBasicMaterial color={index % 3 === 0 ? VIOLET : '#b4f7ff'} />
      </mesh>
    </group>
  )
}

function Topology({ pointer, reducedMotion }: { pointer: RefObject<THREE.Vector2>; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const beaconRef = useRef<THREE.Group>(null)
  const specks = useMemo(() => {
    // Deterministic placement keeps the scene stable between mounts.
    const positions = new Float32Array(24 * 3)
    for (let i = 0; i < 24; i++) {
      const angle = i * 2.399963
      const radius = 1.9 + ((i * 7) % 11) * 0.11
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = -0.9 + ((i * 5) % 13) * 0.18
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  useFrame(({ clock, camera }, delta) => {
    if (reducedMotion) return
    // Keep the origin fixed while adding a restrained camera parallax.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, 5.1 + pointer.current.x * 0.2, 2.4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 4.2 - pointer.current.y * 0.12, 2.4, delta)
    camera.lookAt(0, 0, 0)
    const group = groupRef.current
    if (group) {
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, pointer.current.x * 0.095, 3, delta)
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, pointer.current.y * 0.035, 3, delta)
      group.position.y = Math.sin(clock.elapsedTime * 0.38) * 0.035
    }
    if (beaconRef.current) beaconRef.current.rotation.y = clock.elapsedTime * 0.12
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 6, 4]} intensity={2.2} color="#bfdcff" />
      <pointLight position={[-3, 2, -1]} intensity={7} color="#7c5fd9" distance={8} />
      <pointLight position={[0, 2.4, 1]} intensity={5} color={CYAN} distance={6} />

      {[0, 1, 2].map((index) => <Platform key={index} index={index} y={-0.65 + index * 0.39} />)}

      <group ref={beaconRef} position={[0, 0.83, 0]}>
        <mesh rotation={[0, Math.PI / 6, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.035, 6]} />
          <meshStandardMaterial color="#112b41" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.023, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 6]}>
          <ringGeometry args={[0.43, 0.447, 6]} />
          <meshBasicMaterial color={CYAN} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.034, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.231, 32]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.044, 0]}>
          <sphereGeometry args={[0.054, 12, 12]} />
          <meshBasicMaterial color="#b2f8ff" />
        </mesh>
      </group>

      {[[-0.48, -0.33], [0.48, -0.33], [-0.48, 0.33], [0.48, 0.33]].map(([x, z], index) => (
        <Line key={index} points={[[x, 0.17, z], [x, 0.74, z]]} color={CYAN} lineWidth={0.7} transparent opacity={0.25} />
      ))}
      <Line points={roundedOutline(1.12, 0.86, 0.48)} color={CYAN} lineWidth={0.7} transparent opacity={0.22} />

      {nodes.map((position, index) => <NetworkNode key={index} position={position} index={index} />)}
      {routes.map((points, index) => <TransferRoute key={index} points={points} index={index} reducedMotion={reducedMotion} />)}

      <mesh position={[0, -0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.91, 2.92, 96]} />
        <meshBasicMaterial color="#456987" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[specks, 3]} />
        </bufferGeometry>
        <pointsMaterial color={CYAN} size={0.019} sizeAttenuation transparent opacity={0.33} depthWrite={false} />
      </points>
    </group>
  )
}

function SceneFallback() {
  return (
    <div className="scene-fallback" style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
      <svg viewBox="0 0 600 520" fill="none" style={{ width: '100%', height: '100%', maxWidth: 600 }} aria-hidden="true">
        <g stroke="#69e4f7" strokeWidth="1.2">
          <path d="M126 300 302 205 478 300 302 395Z" fill="#101d32" opacity=".35" />
          <path d="M126 263 302 168 478 263 302 358Z" fill="#101d32" opacity=".65" />
          <path d="M126 226 302 131 478 226 302 321Z" fill="#101d32" opacity=".8" />
          <path d="M302 131V77M126 226H63V310M478 226H541V310M302 395V453" opacity=".4" />
          <path d="M267 190 302 171 337 190 337 229 302 248 267 229Z" fill="#112b41" />
          <circle cx="302" cy="209" r="8" fill="#69e4f7" />
          <circle cx="302" cy="77" r="10" fill="#101d32" />
          <circle cx="63" cy="310" r="10" fill="#101d32" />
          <circle cx="541" cy="310" r="10" fill="#101d32" />
          <circle cx="302" cy="453" r="10" fill="#101d32" />
        </g>
        <ellipse cx="302" cy="300" rx="259" ry="143" stroke="#7183a0" opacity=".13" />
      </svg>
    </div>
  )
}

function ContextLossMonitor({ onContextLost }: { onContextLost: () => void }) {
  const canvas = useThree((state) => state.gl.domElement)
  useEffect(() => {
    const handleLoss = (event: Event) => {
      event.preventDefault()
      onContextLost()
    }
    canvas.addEventListener('webglcontextlost', handleLoss)
    return () => canvas.removeEventListener('webglcontextlost', handleLoss)
  }, [canvas, onContextLost])
  return null
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(_error: Error, _info: ErrorInfo) { /* The static diagram keeps the decorative area usable. */ }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children }
}

export default function HeroScene({ active = true }: HeroSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const [contextLost, setContextLost] = useState(false)
  const handleContextLost = useCallback(() => setContextLost(true), [])
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!active || reducedMotion) return
    const update = (event: PointerEvent) => {
      const bounds = rootRef.current?.getBoundingClientRect()
      if (!bounds || event.pointerType === 'touch') return
      pointer.current.set(
        THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1),
        THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1),
      )
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [active, reducedMotion])

  return (
    <div ref={rootRef} aria-hidden="true" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <SceneErrorBoundary>
        {contextLost ? <SceneFallback /> : <Canvas
          dpr={[1, 1.4]}
          frameloop={active ? reducedMotion ? 'demand' : 'always' : 'never'}
          camera={{ position: [5.1, 4.2, 7.2], fov: 38, near: 0.1, far: 30 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          fallback={<SceneFallback />}
          style={{ pointerEvents: 'none' }}
        >
          <ContextLossMonitor onContextLost={handleContextLost} />
          <Topology pointer={pointer} reducedMotion={reducedMotion} />
        </Canvas>}
      </SceneErrorBoundary>
    </div>
  )
}
