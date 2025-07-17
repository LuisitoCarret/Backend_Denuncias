const mongoose = require('mongoose');

/*
  users
  {
    username : "admin",
    rol      : "admin",
    password : "$2bSeguro"
  }
*/
module.exports = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  rol:      { type: String, enum: ['admin', 'user'], default: 'user' },
  password: { type: String, required: true } 
},{
  versionKey: false
}));
