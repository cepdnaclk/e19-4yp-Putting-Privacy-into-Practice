const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  scenario: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['mcq', 'essay'],
    required: true,
  },
  complexity: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  options: {
    type: Object,
    default: {},
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  principle: {
    type: String,
    required: true,
  },
  reflection: {
    type: String,
    required: true,
  },
  FeedBackonWrongOptions: {
    A: { type: String, default: '' },
    B: { type: String, default: '' },
    C: { type: String, default: '' },
    D: { type: String, default: '' },
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
