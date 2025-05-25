const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  q_value: {
    type: Number,
  },
  question_type: {
    type: String,
    enum: ['mcq', 'short_answer'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  blooms_taxonomy: {
    type: String,
  },
  rational_text: {
    type: String,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
