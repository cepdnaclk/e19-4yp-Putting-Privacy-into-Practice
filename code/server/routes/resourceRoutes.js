const express = require('express');
const multer = require('multer');
const resourceController = require('../controllers/resourceController.js');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post(
  '/upload',
  upload.single('file'),
  resourceController.uploadResource
);
router.get('/', protect, resourceController.listResources);
router.delete('/:id', protect, resourceController.deleteResource);
router.get('/count', protect, resourceController.getResourcesCount);

module.exports = router;
