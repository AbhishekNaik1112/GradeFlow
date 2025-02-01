import mongoose from 'mongoose';
import logger from './logger';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    logger.info('MongoDB connected successfully.');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
