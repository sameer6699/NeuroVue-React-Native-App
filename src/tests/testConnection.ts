import connectDB from '../config/database';

const testConnection = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Test connection failed:', error);
  }
};

// Run the test
testConnection(); 