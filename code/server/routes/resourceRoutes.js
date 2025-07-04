const express = require('express');
const multer = require('multer');
const resourceController = require('../controllers/resourceController.js');

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
router.get('/', resourceController.listResources);
router.delete('/:id', resourceController.deleteResource);
router.get('/count', resourceController.getResourcesCount);

module.exports = router;
