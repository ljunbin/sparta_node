const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  user: {type: String},
  password: {type: String},
  title: {type: String},
  content: {type: String},
}, { timestamps: true, updateAt: true });

module.exports = mongoose.model('Posts', postsSchema);