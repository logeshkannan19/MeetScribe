const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  originalText: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  summary: {
    type: [String],
    default: [],
  },
  keyPoints: {
    type: [String],
    default: [],
  },
  actionItems: [{
    task: String,
    responsibility: String,
  }],
  sentiment: {
    score: Number,
    label: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Note', noteSchema);
