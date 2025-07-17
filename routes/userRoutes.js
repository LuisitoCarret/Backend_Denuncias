const express = require('express');
const { register,login } = require('../controllers/userController');  // Importamos el controlador de registro

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

router.post('/login', login);

module.exports = router;
