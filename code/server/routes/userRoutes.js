const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route POST /api/v1/auth/register
router.post('/register', userController.register);

// @route POST /api/v1/auth/login
router.post('/login', userController.login);

router.get('/check', protect, (req, res) => {
  res.json({ authenticated: true });
});

router.post('/logout', userController.logout);

module.exports = router;
