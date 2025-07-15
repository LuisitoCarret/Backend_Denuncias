const mongoose = require('mongoose');

/*
  complaints
  {
    title       : "Grafiti en muro histórico",
    description : "Se observó vandalismo en la iglesia…",
    category    : "vandalismo",
    evidence    : [ "https://.../evidencia1.jpg" ],
    location    : "CDMX",
    date        : ISODate,
    hashtags    : ["#vandalismo","#grafiti"],
    likes       : 3
  }
*/
module.exports = mongoose.model('Complaint', new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  evidence:    [String],                       // URLs de imagen/video
  location:    { type: String, required: true },
  date:        { type: Date,   default: Date.now },
  hashtags:    [String],
  likes:       { type: Number, default: 0 },
}));
