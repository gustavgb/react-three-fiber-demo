import React, { useMemo, useRef, useState } from 'react'
import { Canvas, MeshProps } from '@react-three/fiber'
import { Mesh,  } from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls, useFBX, useGLTF } from '@react-three/drei'

interface Props {
  rotMod: {
    x: number,
    y: number
  },
  meshProps: MeshProps
}

// function Chair ({ rotMod, rotation, ...props }: Props) {
//   // This reference gives us direct access to the THREE.Mesh object
//   const ref = useRef<Mesh>()
//   const gltf = useGLTF('/assets/chair.gltf')
//   const obj = useMemo(() => gltf.scene.clone(), [])

//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <primitive
//       {...props}
//       rotation={[rotMod.x + rotation[0], rotMod.y + rotation[1], rotation[2]]}
//       object={obj}
//       ref={ref}
//     />
//   )
// }
function Phone ({ rotMod, meshProps: { rotation, ...meshProps} }: Props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>()
  const obj = useFBX('/assets/phone.fbx')
  const [colorMap] = useLoader(TextureLoader, ['assets/pavement.jpeg'])

  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      console.log(c.name)

      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
      <mesh
        {...meshProps}
        rotation={[rotMod.x + rotation[0], rotMod.y + rotation[1], rotation[2]]}
        geometry={geometry}
        ref={ref}
      >
        <meshStandardMaterial
          attach="material"
          map={colorMap}
        />
      </mesh>
  )
}

function Doll ({ rotMod, meshProps: { rotation, ...meshProps} }: Props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>()
  const obj = useFBX('/assets/Voodoo-Dool.fbx')

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
      <primitive
        {...meshProps}
        rotation={[rotMod.x + rotation[0], rotMod.y + rotation[1], rotation[2]]}
        object={obj}
        ref={ref}
      />
  )
}

export default function ThreeView () {
  const [rotation, setRotation] = useState({x: 0, y: 0})

  function onMouseMove (e) {
    // setRotation({
    //   y: (e.clientX - window.innerWidth / 2) / window.innerWidth,
    //   x: (e.clientY - window.innerHeight / 2) / window.innerHeight
    // })
  }

  return (
    <Canvas onMouseMove={onMouseMove}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Chair rotMod={rotation} position={[-3, 2, 0]} rotation={[.8, 0, 0]} scale={1} />
      <Chair rotMod={rotation} position={[-0.5, 1, 0]} rotation={[0, 0, Math.PI/2]} scale={1} /> */}
      <Doll rotMod={rotation} meshProps={{ position: [1.5, -1.5, 0], rotation: [-0.3, Math.PI/2, 0], scale: 0.01}} />
      {/* <Phone rotMod={rotation} position={[-1, -1.5, 0]} rotation={[-0.7, Math.PI/2, 0.5]} scale={1} /> */}
      <OrbitControls />
    </Canvas>
  )
}
