const mongoose = require('mongoose');

/*
  comments
  {
    complaint_id : ObjectId("..."),
    text         : "Comentario adicional…",
    date         : ISODate
  }
*/
const commentSchema = new mongoose.Schema({
  complaint_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
  text:         { type: String, required: true },
  date:         { type: Date,   default: Date.now },
  user_id:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
},{
  versionKey : false
});

// Eliminar `__v` de las respuestas JSON
commentSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;  
    return ret;       
  }
});

module.exports = mongoose.model('Comment', commentSchema);
