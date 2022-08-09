import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

interface Props {
  rotMod: {
    x: number,
    y: number
  },
  rotation: number[],
  position: number[],
  scale?: number
}

function Chair ({ rotMod, rotation, ...props }: Props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>()
  const fbx = useLoader(FBXLoader, '/assets/chair.fbx')
  const obj = useMemo(() => fbx.clone(), [])

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <primitive
      {...props}
      rotation={[rotMod.x + rotation[0], rotMod.y + rotation[1], rotation[2]]}
      object={obj}
      ref={ref}
    />
  )
}
function Phone ({ rotMod, rotation, ...props }: Props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>()
  const fbx = useLoader(FBXLoader, '/assets/phone.fbx')
  const obj = useMemo(() => fbx.clone(), [])

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <primitive
      {...props}
      rotation={[rotMod.x + rotation[0], rotMod.y + rotation[1], rotation[2]]}
      object={obj}
      ref={ref}
    />
  )
}

export default function ThreeView () {
  const [rotation, setRotation] = useState({x: 0, y: 0})

  function onMouseMove (e) {
    setRotation({
      y: (e.clientX - window.innerWidth / 2) / window.innerWidth,
      x: (e.clientY - window.innerHeight / 2) / window.innerHeight
    })
  }

  return (
    <Canvas onMouseMove={onMouseMove}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Chair rotMod={rotation} position={[-3, 2, 0]} rotation={[.8, 0, 0]} scale={0.012} />
      <Chair rotMod={rotation} position={[-0.5, 1, 0]} rotation={[0, 0, Math.PI/2]} scale={0.01} />
      <Phone rotMod={rotation} position={[1.5, -1.5, 0]} rotation={[-0.3, Math.PI/2, 0]} scale={0.04} />
      <Phone rotMod={rotation} position={[-1, -1.5, 0]} rotation={[-0.7, Math.PI/2, 0.5]} scale={0.02} />
    </Canvas>
  )
}
