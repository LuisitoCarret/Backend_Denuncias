const multer = require('multer');
const path = require('path');

// Configuración de Multer para guardar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './evidence'); // Archivos se guardarán en la carpeta 'uploads'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Para evitar duplicados
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Asignamos un nombre único
  },
});

// Aceptar solo imágenes y videos
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|gif|mp4|mov|avi/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // Aceptar el archivo
  } else {
    cb('Error: Solo se permiten imágenes y videos');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño (10MB por archivo)
});

module.exports = upload;
