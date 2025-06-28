const Question = require('../models/Question');

exports.getQuestionsCount = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createQuestion = async (req, res) => {
  const { question, type, complexity, options, correctAnswer } = req.body;

  try {
    const newQuestion = new Question({
      question,
      type,
      complexity,
      options,
      correctAnswer,
    });

    await newQuestion.save();
    res.status(201).json({
      message: 'Question created successfully',
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
