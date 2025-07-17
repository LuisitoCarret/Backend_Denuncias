require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const serverless = require('serverless-http'); // 💡 esto es lo que hace que Vercel lo entienda

const app = express();

const corsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/auth', require('./routes/userRoutes'));

// Conexión a MongoDB (solo si no está conectado aún)
const Complaint = require('./models/Complaint');

mongoose.connect(process.env.MONGO_URI)
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
  });

// ❌ ELIMINAMOS app.listen
// ✅ Exportamos la función para Vercel
module.exports = app;
module.exports.handler = serverless(app);