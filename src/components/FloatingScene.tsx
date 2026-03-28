import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const count = 900
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025
      ref.current.rotation.x += delta * 0.008
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#5eead4"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  )
}

function CentralOrb() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef  = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.18
      outerRef.current.rotation.y += delta * 0.28
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.12
      innerRef.current.rotation.z += delta * 0.20
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#5eead4"
            emissiveIntensity={0.08}
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>
      </group>
    </Float>
  )
}

function OrbitRing({ radius, speed, tiltX, tiltZ }: {
  radius: number
  speed: number
  tiltX: number
  tiltZ: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.007, 6, 90]} />
      <meshBasicMaterial color="#5eead4" transparent opacity={0.2} />
    </mesh>
  )
}

function FloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null)

  const sphereData = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      angle:  (i / 7) * Math.PI * 2,
      radius: 2.3,
      y:      (Math.random() - 0.5) * 0.9,
      r:      0.055 + Math.random() * 0.075,
    })), [])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.35
  })

  return (
    <group ref={groupRef}>
      {sphereData.map((s, i) => (
        <mesh
          key={i}
          position={[Math.cos(s.angle) * s.radius, s.y, Math.sin(s.angle) * s.radius]}
        >
          <sphereGeometry args={[s.r, 8, 8]} />
          <meshStandardMaterial color="#5eead4" emissive="#5eead4" emissiveIntensity={0.6} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export default function FloatingScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 4, 3]} intensity={2.5} color="#5eead4" />
      <pointLight position={[-3, -3, -2]} intensity={1.0} color="#818cf8" />
      <Particles />
      <CentralOrb />
      <OrbitRing radius={1.9} speed={0.45}  tiltX={0.4} tiltZ={0.0} />
      <OrbitRing radius={2.5} speed={-0.28} tiltX={1.1} tiltZ={0.3} />
      <OrbitRing radius={3.0} speed={0.18}  tiltX={0.7} tiltZ={0.8} />
      <FloatingSpheres />
    </>
  )
}
