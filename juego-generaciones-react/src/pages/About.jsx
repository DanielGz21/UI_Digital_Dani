// src/pages/About.jsx

import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div 
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-center mb-6 text-primary">Acerca del Proyecto</h2>
      <p className="text-lg text-gray-700 mb-4">
        El **Juego de Generaciones** es una aplicación interactiva creada para explorar cómo las diferentes generaciones interactúan con la tecnología. Desde los Baby Boomers hasta la Generación Z, cada grupo tiene una perspectiva única que ha moldeado nuestro mundo digital.
      </p>
      <p className="text-lg text-gray-700">
        Este proyecto fue desarrollado con herramientas modernas como **React, Vite y Tailwind CSS** para ofrecer una experiencia de usuario rápida, fluida y visualmente atractiva. ¡Esperamos que te diviertas y aprendas!
      </p>
    </motion.div>
  );
}

// ESTA ES LA LÍNEA MÁS IMPORTANTE DEL ARCHIVO
export default About;