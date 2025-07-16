const express = require('express');
const { register } = require('../controllers/userController');  // Importamos el controlador de registro

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

module.exports = router;
