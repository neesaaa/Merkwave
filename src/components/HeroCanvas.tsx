'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { OrbitControls, Float, Html, useProgress } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Astronaut from './Astronaut'
import { ThreeEvent } from '@react-three/fiber'
import { Camera } from 'three'

interface ResponsiveCameraProps {
  isArabic: boolean;
}

interface HeroCanvasProps {
  isArabic: boolean;
}


function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="w-48">
        <div className="h-2 w-full bg-gray-700 rounded overflow-hidden">
          <div
            className="h-2 bg-cyan-400 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-sm mt-2 text-center">
          Loading {Math.round(progress)}%
        </p>
      </div>
    </Html>
  )
}

export function ResponsiveCamera({ isArabic }: ResponsiveCameraProps) {
  const { camera, size } = useThree()

  useEffect(() => {
    const baseX = -3
    const baseZ = 50

    const addX = size.width < 1005 ? (isArabic ? -2 : -10) : 0
    const scaleZ = size.width < 1005 ? 0.8 : 1

    camera.position.x = baseX + addX
    camera.position.z = baseZ * scaleZ

    camera.updateProjectionMatrix()

  }, [size.width, isArabic, camera])

  return null
}

export default function HeroCanvas({ isArabic }: HeroCanvasProps) {
  const [hovered, setHovered] = useState(false)

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(true)
  }

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(false)
  }

  return (
    <Canvas
      className="w-full h-full cursor-pointer"
      camera={{ 
        position: isArabic ? [0, 0, 0] : [0, 0, 0], 
        fov: 5 
      }}
    >
      <ResponsiveCamera isArabic={isArabic} />
      <Suspense fallback={<Loader />}>
        <Float>
          <group
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <Astronaut isArabic={isArabic} />
          </group>
        </Float>
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={1}
        enableDamping={true}
        dampingFactor={0.05}
        target={isArabic ? [-4.5, 0, 0] : [-2.5, 0, 0]}
      />
      {hovered && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.2}
            intensity={hovered ? 1.5 : 0}
            kernelSize={3}
          />
        </EffectComposer>
      )}
    </Canvas>
  )
}