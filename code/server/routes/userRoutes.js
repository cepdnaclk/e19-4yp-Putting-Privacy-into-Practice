const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route POST /api/v1/auth/register
router.post('/register', userController.register);

// @route POST /api/v1/auth/login
router.post('/login', userController.login);

module.exports = router;
