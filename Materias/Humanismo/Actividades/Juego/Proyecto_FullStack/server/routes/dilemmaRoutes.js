// server/routes/dilemmaRoutes.js
const express = require('express');
const router = express.Router();
const { getDilemmas } = require('../controllers/dilemmaController');

// @ruta    GET /api/dilemmas
// @desc    Obtiene todos los escenarios para el juego de dilemas
// @acceso  Público
router.get('/', getDilemmas);

module.exports = router;