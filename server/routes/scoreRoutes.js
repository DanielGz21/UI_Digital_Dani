// server/routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const { getProfile, saveScore } = require('../controllers/scoreController');
const authMiddleware = require('../middleware/authMiddleware');

// @ruta    GET /api/profile
// @desc    Obtiene el perfil del usuario logueado
// @acceso  Privado (requiere token)
router.get('/profile', authMiddleware, getProfile);

// @ruta    POST /api/scores
// @desc    Guarda una nueva puntuación para el usuario logueado
// @acceso  Privado (requiere token)
router.post('/scores', authMiddleware, saveScore);

module.exports = router;