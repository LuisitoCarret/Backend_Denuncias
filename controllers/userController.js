const User = require('../models/User'); 

// Registro de usuario
exports.register = async (req, res) => {
  const { username, password, rol } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya esta en uso' });
    }

    const newUser = new User({
      username,
      password,  
      rol
    });

    await newUser.save();

 
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        username: newUser.username,
        rol: newUser.rol
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el usuario', detail: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta (comparación directa)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, responder con un mensaje de éxito
    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        username: user.username,
        rol: user.rol
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Error en el login', detail: err.message });
  }
};