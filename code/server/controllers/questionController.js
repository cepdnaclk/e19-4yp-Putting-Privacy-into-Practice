const Question = require('../models/Question');

exports.getQuestionsCount = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
