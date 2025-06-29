const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/questions/count', protect, questionController.getQuestionsCount);
router.post('/questions', protect, questionController.createQuestion);
router.get('/questions', protect, questionController.getAllQuestions);
router.get(
  '/questions/:principle',
  protect,
  questionController.getQuestionsByPrinciple
);

module.exports = router;
