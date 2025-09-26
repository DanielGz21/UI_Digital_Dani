// server/routes/timelineRoutes.js
const express = require('express');
const router = express.Router();
const { getTimelineEvents } = require('../controllers/timelineController');

// @ruta    GET /api/timeline
// @desc    Obtiene todos los eventos para la línea de tiempo
// @acceso  Público
router.get('/', getTimelineEvents);

module.exports = router;