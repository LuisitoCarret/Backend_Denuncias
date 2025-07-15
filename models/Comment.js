const mongoose = require('mongoose');

/*
  comments
  {
    complaint_id : ObjectId("..."),
    text         : "Comentario adicional…",
    date         : ISODate
  }
*/
module.exports = mongoose.model('Comment', new mongoose.Schema({
  complaint_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
  text:         { type: String, required: true },
  date:         { type: Date,   default: Date.now },
}));
