import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Shared mouse position (normalised -1 to 1)
const mouse = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  })
}

function Model() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/avatar.glb')
  const { actions } = useAnimations(animations, groupRef)

  // Play first animation if any (idle)
  useEffect(() => {
    const first = Object.values(actions)[0]
    if (first) { first.reset().fadeIn(0.5).play() }
  }, [actions])

  // Try to find head bone for head-tracking
  const headBone = useRef<THREE.Object3D | null>(null)
  useEffect(() => {
    scene.traverse(obj => {
      const name = obj.name.toLowerCase()
      if (!headBone.current && (name.includes('head') || name.includes('neck'))) {
        headBone.current = obj
      }
    })
  }, [scene])

  useFrame(() => {
    const lerpFactor = 0.06
    if (headBone.current) {
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y,  mouse.x * 0.4, lerpFactor)
      headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, -mouse.y * 0.2, lerpFactor)
    } else if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y,  mouse.x * 0.3, lerpFactor)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.1, lerpFactor)
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

function CameraSetup() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(0, 0, 3)
  }, [camera])
  return null
}

export default function Avatar3D() {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <img
        src="/avatar.png"
        alt="Tanya Mistry"
        style={{ width: 'clamp(240px,34vw,440px)', objectFit: 'contain' }}
      />
    )
  }

  return (
    <Canvas
      onError={() => setError(true)}
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <CameraSetup />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 3]}  intensity={1.2} color="#ffffff" />
      <pointLight       position={[-2, 2, 2]}  intensity={0.8} color="#5eead4" />
      <pointLight       position={[2, -2, -2]} intensity={0.4} color="#818cf8" />
      <Suspense fallback={null}>
        <Model />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.3}
          scale={4}
          blur={2}
          color="#5eead4"
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/avatar.glb')
