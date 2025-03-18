const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Left one important log for database connection confirmation
    if (process.env.NODE_ENV !== 'production') {
      console.log('MongoDB Connected');
    }
  } catch (err) {
    // Keep error logging for critical failures
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB; 