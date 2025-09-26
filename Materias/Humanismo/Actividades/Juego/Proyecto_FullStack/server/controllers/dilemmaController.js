// server/controllers/dilemmaController.js

// Datos de los dilemas. En el futuro, esto podría venir de una base de datos.
const dilemmasData = [
  {
    id: 1,
    scenario: '¡Es viernes por la noche! Quieres organizar una salida con 5 de tus mejores amigos. ¿Cómo los contactas a todos de la forma más eficiente?',
    solutions: [
      {
        generation: 'Generación X',
        method: 'Llamar a cada uno por el teléfono fijo de su casa.',
        outcome: 'Logras contactarlos a todos, pero te toma casi una hora. ¡Uno de ellos no estaba y tuviste que dejar un mensaje con sus padres!',
        efficiency: 'Baja',
      },
      {
        generation: 'Millennials',
        method: 'Crear un evento en Facebook y etiquetarlos.',
        outcome: 'La mayoría responde en un par de horas. Uno de ellos ve la invitación al día siguiente. La organización es clara, pero no instantánea.',
        efficiency: 'Media',
      },
      {
        generation: 'Generación Z',
        method: 'Crear un grupo de WhatsApp o Instagram y enviar un GIF.',
        outcome: '¡En 5 minutos, todos han respondido con emojis y stickers! La planificación es caótica pero increíblemente rápida.',
        efficiency: 'Alta',
      },
    ],
  },
  {
    id: 2,
    scenario: 'Necesitas escuchar tu álbum de música favorito mientras viajas en autobús. ¿Qué dispositivo usas?',
    solutions: [
       {
        generation: 'Generación X',
        method: 'Usar un Walkman con un casete o un Discman con un CD.',
        outcome: 'Disfrutas de la música, pero tienes que llevar el dispositivo y tus casetes/CDs. Si el autobús se mueve mucho, ¡el CD podría saltar!',
        efficiency: 'Baja',
      },
      {
        generation: 'Millennials',
        method: 'Usar un reproductor de MP3 o un iPod.',
        outcome: 'Tienes cientos de canciones en un dispositivo pequeño y ligero. La batería dura días. ¡Una revolución en portabilidad!',
        efficiency: 'Media',
      },
      {
        generation: 'Generación Z',
        method: 'Abrir Spotify o Apple Music en tu smartphone.',
        outcome: 'Acceso instantáneo a millones de canciones, podcasts y playlists. La única limitación es tu plan de datos y la batería del móvil.',
        efficiency: 'Alta',
      },
    ]
  }
];

// Función para obtener todos los dilemas
exports.getDilemmas = (req, res) => {
  try {
    res.json(dilemmasData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};