// src/components/Model.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

function Model({ path, ...props }) {
  // useGLTF es un hook de drei que facilita la carga de modelos glTF
  const { scene } = useGLTF(path);

  // 'primitive' nos permite renderizar la escena del modelo directamente
  // Clonamos la escena para poder reutilizar el mismo modelo varias veces
  return <primitive object={scene.clone()} {...props} />;
}

// Pre-cargamos el modelo para optimizar el rendimiento
// Reemplaza la ruta si tu modelo se llama diferente
useGLTF.preload('/models/nokia_phone.glb');

export default Model;