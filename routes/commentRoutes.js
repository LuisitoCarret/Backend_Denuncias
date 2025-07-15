// routes/commentRoutes.js
const router = require('express').Router();
const { createComment, listComments, updateComment } = require('../controllers/commentController');

// Crear comentario para una denuncia
router.post('/:complaintId', createComment);

// Listar todos los comentarios de una denuncia
router.get('/:complaintId', listComments);

// Actualizar un comentario por ID
router.patch('/:complaintId/:commentId', updateComment);

module.exports = router;
