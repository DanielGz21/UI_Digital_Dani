// server/controllers/timelineController.js

// Por ahora, definiremos los datos directamente aquí.
// En una versión futura, esto podría venir de la base de datos.
const timelineData = [
  { year: 1951, event: 'Se lanza la UNIVAC I, la primera computadora comercial.', generation: 'Baby Boomers' },
  { year: 1969, event: 'ARPANET, el precursor de Internet, envía su primer mensaje.', generation: 'Baby Boomers' },
  { year: 1979, event: 'Sony lanza el Walkman, revolucionando la música portátil.', generation: 'Generación X' },
  { year: 1983, event: 'Nace el primer teléfono móvil comercial, el Motorola DynaTAC 8000X.', generation: 'Generación X' },
  { year: 1995, event: 'Lanzamiento de Windows 95, masificando el uso de computadoras personales.', generation: 'Millennials' },
  { year: 2001, event: 'Nace Wikipedia, cambiando para siempre el acceso al conocimiento.', generation: 'Millennials' },
  { year: 2007, event: 'Apple lanza el primer iPhone, dando inicio a la era de los smartphones.', generation: 'Millennials' },
  { year: 2010, event: 'Se lanza Instagram, redefiniendo la fotografía social.', generation: 'Generación Z' },
  { year: 2016, event: 'TikTok (Douyin en China) es lanzado, creando una nueva forma de video corto.', generation: 'Generación Z' },
];

// Función para obtener todos los eventos de la línea de tiempo
exports.getTimelineEvents = (req, res) => {
  try {
    // Ordenamos los eventos por año para asegurarnos de que lleguen en orden
    const sortedData = timelineData.sort((a, b) => a.year - b.year);
    res.json(sortedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};  