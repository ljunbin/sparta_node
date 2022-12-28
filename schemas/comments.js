const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  postId: {type: String},
  user: {type: String},
  password: {type: String},
  content: {type: String},
}, { timestamps: true, updateAt: true });

module.exports = mongoose.model('Comments', commentsSchema);