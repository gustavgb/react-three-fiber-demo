import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[5, 2.5, 0.3]} />
      <meshStandardMaterial color={hovered ? 'blue' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 })
  function onMouseMove(e) {
    setPosition({
      x: e.clientX / 200,
      y: -e.clientY / 200
    })
  }

  return (
    <Canvas onMouseMove={onMouseMove}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[x, y, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
