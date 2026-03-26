'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry({ position, rotation, scale, geometry }: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  geometry: 'sphere' | 'box' | 'torus' | 'octahedron'
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

  const GeometryComponent = {
    sphere: Sphere,
    box: Box,
    torus: Torus,
    octahedron: Octahedron,
  }[geometry]

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <GeometryComponent args={geometry === 'torus' ? [1, 0.3, 16, 32] : geometry === 'octahedron' ? [1] : [1, 32, 32]}>
          <MeshDistortMaterial
            color="#d4af37"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </GeometryComponent>
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20
      pos[i + 1] = (Math.random() - 0.5) * 20
      pos[i + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#d4af37"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
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

        <ParticleField />

        <FloatingGeometry position={[-3, 1, -2]} geometry="sphere" scale={0.6} />
        <FloatingGeometry position={[3, -1, -3]} geometry="octahedron" scale={0.8} />
        <FloatingGeometry position={[-2, -2, -1]} geometry="box" scale={0.5} />
        <FloatingGeometry position={[2, 2, -2]} geometry="torus" scale={0.4} />

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
