import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log('DATABASE CONNECTED');
  } catch (error) {
    console.log('ERROR CONNECTING DB:', error);
    process.exit(1);
  }
};

export default connectDB;
