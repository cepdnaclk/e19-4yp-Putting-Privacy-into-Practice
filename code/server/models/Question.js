const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
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
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
