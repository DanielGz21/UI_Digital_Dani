// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

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

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../juego-generaciones-react/dist')));

// Definimos las rutas de nuestra API
app.use('/api/auth', authRoutes);
app.use('/api', scoreRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/dilemmas', dilemmaRoutes);
app.use('/api/ai', aiRoutes); // Añade la nueva ruta

// Manejar rutas del frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../juego-generaciones-react/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
