const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
require('dotenv').config();


const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const file = req.file;
    const key = `videos/${crypto.randomUUID()}-${file.originalname}`;

    const putCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    });

    await s3.send(putCommand);

    const fileUrl = `${key}`;
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error('S3 Upload Error:', error);
    res.status(500).json({ error: `Upload failed: ${error.message}` });
  }
};

module.exports = uploadResource;
