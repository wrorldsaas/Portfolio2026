'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere({ position, scale }: {
  position: [number, number, number]
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const randomSpeed = useMemo(() => Math.random() * 0.5 + 0.5, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * randomSpeed
      meshRef.current.rotation.y += 0.003 * randomSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * randomSpeed) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron({ position, scale }: {
  position: [number, number, number]
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const randomSpeed = useMemo(() => Math.random() * 0.5 + 0.5, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * randomSpeed
      meshRef.current.rotation.y += 0.003 * randomSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * randomSpeed) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function FloatingBox({ position, scale }: {
  position: [number, number, number]
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const randomSpeed = useMemo(() => Math.random() * 0.5 + 0.5, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * randomSpeed
      meshRef.current.rotation.y += 0.003 * randomSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * randomSpeed) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus({ position, scale }: {
  position: [number, number, number]
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const randomSpeed = useMemo(() => Math.random() * 0.5 + 0.5, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * randomSpeed
      meshRef.current.rotation.y += 0.003 * randomSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * randomSpeed) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function GoldenRing({ position, scale }: { position: [number, number, number], scale: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      ringRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={ringRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#d4af37"
        emissive="#d4af37"
        emissiveIntensity={0.5}
        metalness={1}
        roughness={0.2}
      />
    </mesh>
  )
}

function GoldenParticles() {
  const groupRef = useRef<THREE.Group>(null)
  const particleCount = 50

  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < particleCount; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 5
        ] as [number, number, number],
        scale: Math.random() * 0.03 + 0.01
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f4d03f" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#d4af37"
          castShadow
        />

        <GoldenParticles />

        <FloatingSphere position={[-3, 1, -2]} scale={0.6} />
        <FloatingOctahedron position={[3, -1, -3]} scale={0.8} />
        <FloatingBox position={[-2, -2, -1]} scale={0.5} />
        <FloatingTorus position={[2, 2, -2]} scale={0.4} />

        <GoldenRing position={[0, 0, -5]} scale={3} />
        <GoldenRing position={[4, -3, -4]} scale={1.5} />
        <GoldenRing position={[-4, 3, -4]} scale={1.2} />

        <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0a0a0a" transparent opacity={0} />
        </mesh>
      </Canvas>
    </div>
  )
}
