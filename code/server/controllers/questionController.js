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
  const { question, type, complexity, options, correctAnswer, principle } =
    req.body;

  try {
    const newQuestion = new Question({
      question,
      type,
      complexity,
      options,
      correctAnswer,
      principle,
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

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getQuestionsByPrinciple = async (req, res) => {
  try {
    const principleSlug = req.params.principle;
    const principleMap = {
      'lawfulness-fairness-transparency': 'lawfulness_fairness_transparency',
      'purpose-limitation': 'purpose_limitation',
      'data-minimization': 'data_minimization',
      accuracy: 'accuracy',
      'storage-limitation': 'storage_limitation',
      'integrity-confidentiality': 'integrity_confidentiality',
      accountability: 'accountability',
    };

    const principleValue = principleMap[principleSlug] || principleSlug;

    const questions = await Question.find({ principle: principleValue });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching questions',
      error: error.message,
    });
  }
};
