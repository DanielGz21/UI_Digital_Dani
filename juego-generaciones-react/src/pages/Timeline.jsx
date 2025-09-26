// src/pages/Timeline.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Componente para un solo evento en la línea de tiempo
const TimelineItem = ({ event, index }) => {
  const isLeft = index % 2 === 0;

  // En pantallas pequeñas, todo se alinea a la izquierda
  const itemAlignment = "flex items-center w-full mb-8";
  const cardAlignment = `order-1 w-full md:w-5/12 px-6 py-4 rounded-lg shadow-xl bg-white ${isLeft ? 'md:text-right' : 'md:text-left'}`;

  return (
    <motion.div
      className={itemAlignment}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Este div vacío ayuda con el espaciado en pantallas grandes */}
      <div className={`order-1 w-5/12 ${isLeft ? '' : 'hidden md:block'}`}></div>
      
      {/* Punto central en la línea */}
      <div className="z-10 flex items-center order-1 w-8 h-8 bg-primary rounded-full shadow-xl">
        <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
      </div>

      {/* Tarjeta de información del evento */}
      <div className={cardAlignment}>
        <p className="mb-2 text-xl font-bold text-primary">{event.year}</p>
        <p className="text-md leading-snug tracking-wide text-gray-700">
          {event.event}
        </p>
        <p className="text-sm font-semibold text-gray-500 mt-2">{event.generation}</p>
      </div>
    </motion.div>
  );
};

function Timeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Asegúrate de que tu servidor backend esté corriendo en el puerto 5001
        const response = await axios.get('http://localhost:5001/api/timeline');
        setEvents(response.data);
      } catch (error) {
        console.error("Error al obtener los eventos de la línea de tiempo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl">Cargando la historia digital...</div>;

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-12">Línea de Tiempo Digital</h1>
      <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
        {/* La línea vertical central, solo visible en pantallas grandes */}
        <div className="hidden md:block border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
        
        {events.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;