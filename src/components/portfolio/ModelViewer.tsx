'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function SphereModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#d4af37"
          distort={0.2}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

function CubeModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function TorusModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

function ComplexModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#f4d03f"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </group>
    </Float>
  )
}

interface ModelViewerProps {
  modelType?: 'sphere' | 'cube' | 'torus' | 'complex'
  className?: string
}

export default function ModelViewer({ modelType = 'sphere', className = '' }: ModelViewerProps) {
  const ModelComponent = {
    sphere: SphereModel,
    cube: CubeModel,
    torus: TorusModel,
    complex: ComplexModel,
  }[modelType]

  return (
    <div className={`w-full h-full min-h-[300px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            color="#d4af37"
            castShadow
          />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#f4d03f" />

          <ModelComponent />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2.4}
            color="#d4af37"
          />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1}
          />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
