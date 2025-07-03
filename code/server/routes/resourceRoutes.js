const express = require('express');
const multer = require('multer');
const uploadResource = require('../controllers/resourceController.js');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post('/upload', upload.single('file'), uploadResource);

module.exports = router;
