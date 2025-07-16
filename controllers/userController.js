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
