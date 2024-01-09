import React from 'react';
import { Canvas } from '@react-three/fiber';
import { BlendFunction } from 'postprocessing';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { OrbitControls, PerspectiveCamera, CubeCamera, Environment } from '@react-three/drei';

import { Car } from './components/Car';
import { Rings } from './components/Rings';
import { Boxes } from './components/Boxes';
import { Ground } from './components/Ground';
import { FloatingGrid } from './components/FloatingGrid';

import './styles/global.css';

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach='background' />

      <CubeCamera resolution={30} frames={140}>
        {texture => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <Rings />
      <Boxes />
      <FloatingGrid />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={150}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={200}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={3}
          width={600}
          height={600}
          kernelSize={1}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0005]}
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <React.Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </React.Suspense>
  );
}

export default App;