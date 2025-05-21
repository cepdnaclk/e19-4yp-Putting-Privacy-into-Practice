const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT;

// Database Connection
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

// default route
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Home page',
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log('Error starting the server: ', error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
