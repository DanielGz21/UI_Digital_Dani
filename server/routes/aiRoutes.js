// server/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { chatWithGuide } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

// @ruta    POST /api/ai/chat
// @desc    Envía un mensaje al guía virtual de IA
// @acceso  Privado (requiere que el usuario haya iniciado sesión)
router.post('/chat', authMiddleware, chatWithGuide);

module.exports = router;