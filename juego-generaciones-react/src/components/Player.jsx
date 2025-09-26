// src/components/Player.jsx
import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

// Hook personalizado para detectar qué teclas están siendo presionadas
function useKeyboardControls() {
  const keys = useRef({
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => (keys.current[event.code] = true);
    const handleKeyUp = (event) => (keys.current[event.code] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}

export function Player(props) {
  const { camera } = useThree();
  const keys = useKeyboardControls();
  
  // Creamos una esfera física invisible que actuará como el cuerpo del jugador
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 2, 10], // Posición inicial del jugador en el vestíbulo
    ...props,
  }));

  // Nos suscribimos a la velocidad para usarla en los cálculos de movimiento
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  // useFrame se ejecuta en cada fotograma; aquí ocurre toda la magia del movimiento
  useFrame(() => {
    // La cámara siempre sigue la posición de nuestra esfera física
    camera.position.copy(ref.current.position);

    const direction = new Vector3();
    const frontVector = new Vector3(0, 0, (keys.current.KeyW ? -1 : 0) + (keys.current.KeyS ? 1 : 0));
    const sideVector = new Vector3((keys.current.KeyD ? 1 : 0) - (keys.current.KeyA ? 1 : 0), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(5) // Velocidad de movimiento
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });

  return <mesh ref={ref}></mesh>;
}