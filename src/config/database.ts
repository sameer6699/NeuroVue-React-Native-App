import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/NeuroVue-ReactNative-app';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log('\x1b[32m%s\x1b[0m', '==========================================');
    console.log('\x1b[32m%s\x1b[0m', '✅ Database Connection Successful!');
    console.log('\x1b[32m%s\x1b[0m', `📦 Database: ${conn.connection.name}`);
    console.log('\x1b[32m%s\x1b[0m', `🌐 Host: ${conn.connection.host}`);
    console.log('\x1b[32m%s\x1b[0m', '==========================================');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB; 