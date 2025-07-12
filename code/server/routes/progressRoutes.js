const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.get('/progress', protect, progressController.getUserProgress);
router.post('/progress/update', protect, progressController.updateUserProgress);
router.post('/progress/reset', protect, progressController.resetUserProgress);

module.exports = router;
