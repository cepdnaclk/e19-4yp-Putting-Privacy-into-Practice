const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'adminstrator'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // creates createdAt, updatedAt fields, automatic management.
  }
);

module.exports = mongoose.model('User', userSchema);
