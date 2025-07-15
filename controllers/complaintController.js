const Complaint = require('../models/Complaint');

// POST /api/complaints
exports.createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      evidence = [],       
      location,
      hashtags = ''
    } = req.body;

    const newComplaint = await Complaint.create({
      title,
      description,
      category,
      evidence,                   
      location,
      hashtags,
    });

    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos o incompletos', detail: err.message });
  }
};

// GET /api/complaints
exports.listComplaints = async (_req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener denuncias' });
  }
};

// PATCH /api/complaints
exports.updateComplaint = async (req, res) => {
  const { id } = req.params; 
  const { title, description, category, evidence, location, hashtags } = req.body;

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id, 
      { title, description, category, evidence, location, hashtags }, 
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Denuncia no encontrada' });
    }

    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar denuncia', detail: err.message });
  }
};

// DELETE /api/complaints
exports.deleteComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ error: 'Denuncia no encontrada' });
    }

    res.json({ message: 'Denuncia eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar denuncia', detail: err.message });
  }
};


exports.getComplaintById = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: 'Denuncia no encontrada' });
    }

    res.json(complaint);
  } catch (err) {
    res.status(400).json({ error: 'Error al obtener denuncia', detail: err.message });
  }
};