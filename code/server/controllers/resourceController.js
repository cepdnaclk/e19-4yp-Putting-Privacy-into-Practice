const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');
const Resource = require('../models/Resource');
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.uploadResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const { title, principle } = req.body;
    if (!title || !principle) {
      return res.status(400).json({ message: 'Missing title or principle' });
    }

    const key = `videos/${crypto.randomUUID()}-${req.file.originalname}`;

    const putCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ContentLength: req.file.size,
    });

    await s3.send(putCommand);

    const resource = new Resource({
      title,
      s3Key: key,
      principle,
    });
    await resource.save();

    res.status(200).json({
      message: 'Upload successful',
      resource: {
        id: resource._id,
        title: resource.title,
        principle: resource.principle,
        s3Key: resource.s3Key,
      },
    });
  } catch (error) {
    console.error('S3 Upload Error:', error);
    res.status(500).json({ error: `Upload failed: ${error.message}` });
  }
};

exports.listResources = async (req, res) => {
  try {
    const { principle } = req.query;

    const filter = principle ? { principle } : {};

    const resources = await Resource.find(filter).sort({ uploadedAt: -1 });

    const signedResources = await Promise.all(
      resources.map(async (item) => {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: item.s3Key,
        });
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return {
          id: item._id,
          title: item.title,
          principle: item.principle,
          videoUrl: signedUrl,
        };
      })
    );

    res.json(signedResources);
  } catch (error) {
    console.error('Error listing resources:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: resource.s3Key,
    });
    await s3.send(deleteCommand);
    await Resource.findByIdAndDelete(id);
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getResourcesCount = async (req, res) => {
  try {
    const count = await Resource.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching resources count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
