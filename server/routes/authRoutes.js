// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @ruta    POST /api/auth/register
// @desc    Registra un nuevo usuario
router.post('/register', register);

// @ruta    POST /api/auth/login
// @desc    Autentica un usuario y devuelve un token
router.post('/login', login);

module.exports = router;