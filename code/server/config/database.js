const mongoose = require('mongoose');
const colors = require('colors');

require('dotenv').config();
exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(colors.green('Database Connected Succesfully.')))
    .catch((error) => {
      console.log(colors.red.underline('Database Connection Failed.'));
      console.error(error);
      process.exit(1);
    });
};
