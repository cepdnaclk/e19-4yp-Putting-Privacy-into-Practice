const express = require('express');
const router = express.Router();
const { getLLMFeedback } = require('../services/gptService');

router.post('/generate-feedback', async (req, res) => {
  const { question, userAnswer, correctAnswer, principle } = req.body;

  try {
    const feedback = await getLLMFeedback(
      question,
      userAnswer,
      correctAnswer,
      principle
    );
    res.json({ feedback });
  } catch (error) {
    console.error('LLM error:', error);
    res.status(500).json({ error: 'Failed to generate feedback' });
  }
});

module.exports = router;
