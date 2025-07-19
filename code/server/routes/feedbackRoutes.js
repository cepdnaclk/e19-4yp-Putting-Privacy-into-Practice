const express = require('express');
const router = express.Router();
const {
  generateFeedback,
  storeFeedback,
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-feedback', protect, generateFeedback);
router.post('/store-feedback', protect, storeFeedback);

module.exports = router;
