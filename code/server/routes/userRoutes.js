const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/check', protect, (req, res) => {
  res.json({ authenticated: true });
});
router.post('/logout', userController.logout);
router.get('/users/count', protect, userController.getUsersCount);
router.get('/users', protect, userController.getAllUsers);

module.exports = router;
