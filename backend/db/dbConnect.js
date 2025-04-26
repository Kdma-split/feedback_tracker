const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/feedback-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected to host: ${connection.connection.host}`);
    console.log(`MongoDB Connected on port: ${connection.connection.port}`);
  } 
  catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();
