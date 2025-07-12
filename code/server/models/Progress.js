const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completedLevels: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Number,
    default: 0,
  },
  levelStars: {
    type: [Number],
    default: () => Array(7).fill(0),
  },
  questions: {
    type: [
      {
        question: {
          type: Object, // Stores the full question object
          required: true,
        },
        selectedOption: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('Progress', progressSchema);
