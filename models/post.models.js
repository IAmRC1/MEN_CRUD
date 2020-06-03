const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now
  },
});

module.exports = Post;