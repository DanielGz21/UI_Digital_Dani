// src/components/World.jsx
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useBox, usePlane } from '@react-three/cannon';
import { Text } from '@react-three/drei';

// Componente para el suelo con textura
function Floor(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const floorTexture = useLoader(TextureLoader, '/textures/marble-floor.png'); // Asegúrate de que el nombre coincida

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
}

// Componente para los muros con textura
function Wall({ position, args }) {
  const [ref] = useBox(() => ({ type: 'Static', position, args }));
  const wallTexture = useLoader(TextureLoader, '/textures/wall-plaster.png'); // Asegúrate de que el nombre coincida

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial map={wallTexture} />
    </mesh>
  );
}

// El componente World ahora usa los nuevos componentes con texturas
export default function World() {
  return (
    <>
      <Floor />

      {/* Muros del Vestíbulo Principal */}
      <Wall position={[-15, 2.5, 0]} args={[30, 5, 0.5]} />
      <Wall position={[0, 2.5, 15]} args={[30, 5, 0.5]} />
      <Wall position={[0, 2.5, -15]} args={[0.5, 5, 30]} />
      
      {/* Muro derecho con un pasillo */}
      <Wall position={[0, 2.5, 7.75]} args={[0.5, 5, 14.5]} />
      <Wall position={[0, 2.5, -7.75]} args={[0.5, 5, 14.5]} />
      
      {/* Muros de la Sala Millennial */}
      <Wall position={[7.5, 2.5, 15]} args={[15, 5, 0.5]} />
      <Wall position={[7.5, 2.5, -15]} args={[15, 5, 0.5]} />
      <Wall position={[15, 2.5, 0]} args={[0.5, 5, 30]} />
      
      {/* Texto 3D */}
      <Text position={[0, 3, -14.5]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.5} color="#333">
        Vestíbulo Principal
      </Text>
      <Text position={[7.5, 3, 14.5]} rotation={[-Math.PI / 2, 0, 0]} fontSize={1.2} color="#4A90E2">
        Ala Millennial
      </Text>
    </>
  );
}