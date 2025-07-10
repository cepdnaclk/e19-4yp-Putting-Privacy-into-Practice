const express = require('express');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const progressRoutes = require('./routes/progressRoutes');
const database = require('./config/database');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Database Connection
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const corsOrigin =
  process.env.NODE_ENV === 'production'
    ? process.env.CORS_ORIGIN_PROD
    : process.env.CORS_ORIGIN_DEV;

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use('/api/auth', userRoutes);
app.use('/api', questionRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api', progressRoutes);

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
