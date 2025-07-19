const Question = require('../models/Question');

exports.getQuestionsCount = async (req, res) => {
  try {
    const [counts, total] = await Promise.all([
      Question.aggregate([
        {
          $group: {
            _id: '$complexity',
            count: { $sum: 1 },
          },
        },
      ]),
      Question.countDocuments(),
    ]);
    // Format response as { easy: X, medium: Y, hard: Z, total: N }
    const result = { easy: 0, medium: 0, hard: 0, total };
    counts.forEach((item) => {
      if (item._id === 'easy') result.easy = item.count;
      if (item._id === 'medium') result.medium = item.count;
      if (item._id === 'hard') result.hard = item.count;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createQuestion = async (req, res) => {
  const {
    scenario,
    challenge,
    type,
    complexity,
    options,
    correctAnswer,
    principle,
    reflection,
  } = req.body;

  try {
    const newQuestion = new Question({
      scenario,
      challenge,
      type,
      complexity,
      options,
      correctAnswer,
      principle,
      reflection,
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

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
