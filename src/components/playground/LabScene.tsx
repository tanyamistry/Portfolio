import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function Screen({ party }: { party: boolean }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024; canvas.height = 680
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#202638'; ctx.fillRect(0, 0, 1024, 680)
    ctx.fillStyle = '#30374b'; ctx.fillRect(0, 0, 1024, 62)
    ;['#ff947c', '#e9ce83', '#bce6ab'].forEach((color, i) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(35 + i * 30, 31, 8, 0, Math.PI * 2); ctx.fill() })
    ctx.fillStyle = '#a8afc1'; ctx.font = '22px monospace'; ctx.fillText('tanya@playground:~', 650, 39)
    ctx.fillStyle = '#cad0df'; ctx.font = '25px monospace'; ctx.fillText('$ make something meaningful', 65, 129)
    ctx.fillStyle = '#f3f0e8'; ctx.font = 'bold 118px sans-serif'; ctx.fillText(party ? 'ideas into' : 'hello,', 62, 281)
    ctx.fillStyle = '#c1acf4'; ctx.fillText(party ? 'impact.' : 'world.', 62, 402)
    ctx.fillStyle = '#d6ef9a'; ctx.font = '28px monospace'; ctx.fillText('> data. code. a little magic_', 65, 490)
    ctx.strokeStyle = '#45495a'; ctx.beginPath(); ctx.moveTo(65, 540); ctx.lineTo(957, 540); ctx.stroke()
    ctx.fillStyle = '#9ca7b8'; ctx.font = '22px monospace'; ctx.fillText('● ALL SYSTEMS CURIOUS', 65, 598)
    const result = new THREE.CanvasTexture(canvas); result.colorSpace = THREE.SRGBColorSpace
    return result
  }, [party])
  useEffect(() => () => texture.dispose(), [texture])
  return <mesh position={[0, 0, .181]}><planeGeometry args={[2.65, 1.76]} /><meshBasicMaterial map={texture} /></mesh>
}

function DataShape({ position, color, shape, motion }: { position: [number, number, number]; color: string; shape: 'ring' | 'cube' | 'orb'; motion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => { if (mesh.current && motion) { mesh.current.rotation.y += delta * .28; mesh.current.rotation.z += delta * .14 } })
  return <Float speed={motion ? 1.6 : 0} floatIntensity={motion ? .5 : 0} rotationIntensity={motion ? .25 : 0}><mesh ref={mesh} position={position} rotation={[.4, .3, .2]} castShadow>
    {shape === 'ring' ? <torusGeometry args={[.46, .13, 16, 48]} /> : shape === 'cube' ? <boxGeometry args={[.55, .55, .55]} /> : <icosahedronGeometry args={[.38, 0]} />}
    <meshStandardMaterial color={color} roughness={.35} metalness={.12} />
  </mesh></Float>
}

function Workstation({ party, motion }: { party: boolean; motion: boolean }) {
  return <group position={[0, -.45, 0]}>
    <RoundedBox args={[5.7, .32, 3.7]} radius={.12} position={[0, -.75, 0]} castShadow receiveShadow><meshStandardMaterial color={party ? '#c7e4a2' : '#bba8e5'} roughness={.55} /></RoundedBox>
    <RoundedBox args={[5.15, .15, 3.18]} radius={.07} position={[0, -.97, -.05]} castShadow><meshStandardMaterial color="#7b70a0" /></RoundedBox>
    {[-2, 2].flatMap(x => [-1.1, 1.1].map(z => <mesh key={`${x}-${z}`} position={[x, -1.48, z]} castShadow><cylinderGeometry args={[.15, .12, 1.05, 24]} /><meshStandardMaterial color="#ece5d6" /></mesh>))}
    <group position={[-.3, 1.0, -.65]} rotation={[0, .08, 0]}>
      <RoundedBox args={[3.02, 2.2, .36]} radius={.16} castShadow><meshStandardMaterial color="#eee9dc" roughness={.4} /></RoundedBox>
      <Screen party={party} />
      <mesh position={[1.25, -.99, .195]}><sphereGeometry args={[.027, 16, 16]} /><meshBasicMaterial color="#b9d893" /></mesh>
      <RoundedBox args={[.42, .68, .3]} radius={.07} position={[0, -1.29, -.05]} castShadow><meshStandardMaterial color="#d8d1c5" /></RoundedBox>
      <RoundedBox args={[1.4, .12, .8]} radius={.05} position={[0, -1.66, .03]} castShadow><meshStandardMaterial color="#ece5d6" /></RoundedBox>
    </group>
    <group position={[-.32, -.5, 1]} rotation={[.06, .06, 0]}>
      <RoundedBox args={[2.3, .15, .82]} radius={.065} castShadow><meshStandardMaterial color="#e1dacc" /></RoundedBox>
      {[0, 1, 2, 3].flatMap(row => Array.from({ length: 11 }, (_, col) => <RoundedBox key={`${row}-${col}`} args={[col === 5 && row === 3 ? .75 : .145, .075, .125]} radius={.025} position={[(col - 5) * .195, .108, (row - 1.5) * .175]} visible={!(row === 3 && [4, 6, 7].includes(col))} castShadow><meshStandardMaterial color={row === 0 && col === 0 ? '#ff9273' : col === 10 ? '#b8a2e1' : '#fbf8f0'} /></RoundedBox>))}
    </group>
    <mesh position={[1.48, -.48, 1.03]} scale={[.22, .13, .33]} castShadow><sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial color="#eee9dc" /></mesh>
    <group position={[-2.19, -.41, -.55]}>
      <mesh castShadow><cylinderGeometry args={[.35, .26, .53, 32]} /><meshStandardMaterial color="#ec9a7d" roughness={.9} /></mesh>
      <mesh position={[0, .26, 0]}><cylinderGeometry args={[.29, .29, .025, 24]} /><meshStandardMaterial color="#534738" /></mesh>
      <mesh position={[0, .67, 0]} castShadow><cylinderGeometry args={[.04, .055, .8, 12]} /><meshStandardMaterial color="#748b60" /></mesh>
      {Array.from({ length: 6 }, (_, i) => <mesh key={i} position={[Math.sin(i * 2.2) * .23, .48 + i * .115, Math.cos(i * 2.2) * .18]} rotation={[.2, i * 2.2, i % 2 ? -.65 : .65]} scale={[.15, .33, .1]} castShadow><sphereGeometry args={[1, 16, 12]} /><meshStandardMaterial color={i % 2 ? '#bed99b' : '#90b178'} roughness={.7} /></mesh>)}
    </group>
    <group position={[2.1, -.4, -.5]}>
      <mesh castShadow><cylinderGeometry args={[.29, .25, .48, 32]} /><meshStandardMaterial color="#e9c784" roughness={.4} /></mesh>
      <mesh position={[0, .245, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[.25, 32]} /><meshStandardMaterial color="#49322c" /></mesh>
      <mesh position={[.31, .03, 0]}><torusGeometry args={[.18, .065, 12, 24]} /><meshStandardMaterial color="#e9c784" /></mesh>
    </group>
    <group position={[1.7, -.5, -1.13]} rotation={[0, -.2, 0]}>
      <RoundedBox args={[.75, .13, .56]} radius={.02} castShadow><meshStandardMaterial color="#d6ef9a" /></RoundedBox>
      <RoundedBox args={[.7, .12, .54]} radius={.02} position={[.03, .12, 0]} rotation={[0, .18, 0]} castShadow><meshStandardMaterial color="#ff957b" /></RoundedBox>
    </group>
    <DataShape position={[2.18, 2.5, -.6]} color="#c1acf4" shape="ring" motion={motion} />
    <DataShape position={[-2.3, 2.2, .3]} color="#d6ef9a" shape="cube" motion={motion} />
    <DataShape position={[1.95, .75, 1.4]} color="#ff9777" shape="orb" motion={motion} />
  </group>
}

export default function LabScene({ motion, party }: { motion: boolean; party: boolean }) {
  return <Canvas shadows dpr={[1, 1.7]} camera={{ position: [6.5, 4.8, 8.5], fov: 37 }} gl={{ antialias: true, alpha: true }} frameloop={motion ? 'always' : 'demand'}>
    <ambientLight intensity={1.25} />
    <directionalLight position={[3, 8, 6]} intensity={3} castShadow shadow-mapSize={[1024, 1024]} shadow-normalBias={.04} />
    <directionalLight position={[-5, 2, 2]} intensity={2} color="#d0baff" />
    <pointLight position={[3, 2, -3]} intensity={8} color={party ? '#d6ef9a' : '#ecb99a'} />
    <Workstation party={party} motion={motion} />
    <OrbitControls makeDefault target={[0, .15, 0]} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3.4} maxPolarAngle={Math.PI / 2.1} minAzimuthAngle={-Math.PI / 3} maxAzimuthAngle={Math.PI / 3} autoRotate={party && motion} autoRotateSpeed={1.6} enableDamping={motion} />
  </Canvas>
}
