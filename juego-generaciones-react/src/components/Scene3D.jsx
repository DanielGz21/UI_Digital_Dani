// src/components/Scene3D.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Model from './Model';
import World from './World';
import { Player } from './Player';
import { Annotation } from './Annotation';

// Componente para un pedestal de exhibición
function Pedestal({ position }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.7, 0.8, 0.8, 32]} />
      <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function ExhibitItem({ exhibit, onExhibitClick }) {
  // Posición del objeto sobre el pedestal
  const objectPosition = [exhibit.position[0], exhibit.position[1] + 0.4, exhibit.position[2]];

  return (
    <group>
      <Pedestal position={exhibit.position} />
      <group position={objectPosition}>
        <Model
          path={exhibit.modelPath}
          scale={exhibit.scale}
          onClick={() => onExhibitClick(exhibit.id)}
        />
      </group>
      {/* Foco de luz sobre el objeto */}
      <spotLight
        position={[exhibit.position[0], exhibit.position[1] + 4, exhibit.position[2]]}
        target-position={objectPosition}
        intensity={50} // Intensidad del foco
        angle={0.3}
        penumbra={0.5}
        castShadow
      />
    </group>
  );
}

function AiGuide({ onGuideClick }) {
  return (
    <mesh
      position={[-10, 1, -10]}
      onClick={onGuideClick}
    >
      <sphereGeometry args={[0.7]} />
      <meshStandardMaterial color="gold" emissive="gold" emissiveIntensity={1} />
    </mesh>
  );
}

export function Scene3D({ exhibits, onExhibitClick, onGuideClick, selectedExhibit }) {
  return (
    <div className="w-full h-[600px] bg-gray-800 rounded-lg shadow-inner cursor-pointer">
      <Canvas shadows camera={{ fov: 75 }}>
        <Environment preset="night" /> {/* Un preset oscuro para que destaquen los focos */}
        <ambientLight intensity={0.2} />
        
        <Physics gravity={[0, -30, 0]}>
          <Suspense fallback={null}>
            <World />
            <Player />
            
            {exhibits.map((exhibit) => (
              <ExhibitItem key={exhibit.id} exhibit={exhibit} onExhibitClick={onExhibitClick} />
            ))}

            <AiGuide onGuideClick={onGuideClick} />
            
            <Annotation exhibit={selectedExhibit} />
          </Suspense>
        </Physics>
        
        <PointerLockControls />
      </Canvas>
    </div>
  );
}