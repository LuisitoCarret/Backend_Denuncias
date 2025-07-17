require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Configuración de CORS modularizada
const configureCors = () => {
  const allowedOrigins = [
    'http://localhost:3000/register',  // Origen local de desarrollo
    'https://mi-frontend.vercel.app'  // Origen de producción
  ];

  const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE,UPDATE', 
    allowedHeaders: 'Content-Type,Authorization',  
    credentials: true,  
  };

  return corsOptions;
};

const app = express();

// Configuración de puertos y MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Aplicar CORS
app.use(cors(configureCors()));  // Aplicamos la configuración modularizada
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de la API
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/auth', require('./routes/userRoutes'));

// Conexión a MongoDB Atlas
const Complaint = require('./models/Complaint');

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB Atlas');

    const docs = await Complaint.find().sort({ date: -1 });
    console.log(`📦 Total de denuncias: ${docs.length}`);
    docs.forEach(d => {
      console.log(`📝 ${d.title} | ${d.date.toISOString()} | Likes: ${d.likes}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB:', err);
    process.exit(1); 
  });

// Escuchar en el puerto proporcionado
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
