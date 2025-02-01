import { config } from "dotenv";
import mongoose from "mongoose";
import logger from "../config/logger";

config();

const MONGODB_URI: string = process.env.MONGO_URI as string;

const MongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info(" MongoDB Database connected successfully");
  } catch (error) {
    logger.error("Error connecting to the database:", error);
  }
};

export default MongoDB;
