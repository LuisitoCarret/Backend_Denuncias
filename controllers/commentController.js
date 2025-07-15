const Comment = require('../models/Comment');

// POST /api/comments/:complaintId
exports.createComment = async (req, res) => {
  const { complaintId } = req.params;
  const { text } = req.body;

  try {
    const newComment = new Comment({
      complaint_id: complaintId,
      text
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear comentario', detail: err.message });
  }
};

// GET /api/comments/:complaintId
exports.listComments = async (req, res) => {
  const { complaintId } = req.params;

  try {
    const comments = await Comment.find({ complaint_id: complaintId }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: 'Error al listar comentarios', detail: err.message });
  }
};

// PATCH /api/comments/:complaintId/:commentId
exports.updateComment = async (req, res) => {
  const { complaintId, commentId } = req.params;
  const { text } = req.body; 

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    if (comment.complaint_id.toString() !== complaintId) {
      return res.status(400).json({ error: 'El comentario no pertenece a esta denuncia' });
    }

    comment.text = text;

    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar comentario', detail: err.message });
  }
};
