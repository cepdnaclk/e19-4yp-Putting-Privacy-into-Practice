const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  is_correct: {
    type: Boolean,
    default: false,
  },
});

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
  options: {
    type: [optionSchema],
    validate: {
      validator: function (value) {
        // Ensure options exist only if question_type is "mcq"
        if (this.question_type === 'mcq') {
          return Array.isArray(value) && value.length >= 2;
        }
        return value === undefined || value.length === 0;
      },
      message: 'MCQ questions must have at least two options.',
    },
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
