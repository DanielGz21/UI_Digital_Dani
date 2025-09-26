// src/components/Annotation.jsx
import React from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Annotation({ exhibit }) {
  if (!exhibit) return null;

  return (
    // El componente <Html> de drei nos permite renderizar HTML normal dentro de una escena 3D
    <Html position={[exhibit.position[0], exhibit.position[1] + 1.5, exhibit.position[2]]} center>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-lg w-64 text-left font-sans"
      >
        <h3 className="text-lg font-bold text-primary mb-1">{exhibit.title}</h3>
        <p className="text-xs font-semibold text-gray-500 mb-2">{exhibit.generation}</p>
        <p className="text-sm text-gray-700 mb-4">{exhibit.description}</p>
        <Link to={exhibit.link}>
            <button className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:bg-teal-500 transition-colors">
                Ir a la Actividad
            </button>
        </Link>
      </motion.div>
    </Html>
  );
}