require('./db/dbConnect.js');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedback.route.js');

const app = express();

// // const allowedOrigins = ["http//localhost:5173"];
// const allowedOrigins = ["*"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); 
//     } else {
//       callback(new Error('Not allowed by CORS'));  
//     }
//   },
//   methods: ['GET', 'POST'], 
//   allowedHeaders: ['Content-Type', 'Authorization'], 
//   credentials: true 
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json()); 
app.use(morgan('dev')); 

app.use('/api/v1', feedbackRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
