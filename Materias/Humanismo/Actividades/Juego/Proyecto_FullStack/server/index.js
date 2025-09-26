// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importamos nuestras rutas
const authRoutes = require('./routes/authRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const dilemmaRoutes = require('./routes/dilemmaRoutes');
const aiRoutes = require('./routes/aiRoutes'); // Importa la nueva ruta

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Definimos las rutas de nuestra API
app.use('/api/auth', authRoutes);
app.use('/api', scoreRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/dilemmas', dilemmaRoutes);
app.use('/api/ai', aiRoutes); // Añade la nueva ruta

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API del Juego de Generaciones funcionando correctamente 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});