const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/questions/count', protect, questionController.getQuestionsCount);

module.exports = router;
