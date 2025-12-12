import mongoose from "mongoose";
import { OBJ_CONSTANTS, NUM_CONSTANTS } from "../constants.js";
import { logger } from "../utils/logger.js";

export async function connectDB() {
  try {
    await mongoose.connect(OBJ_CONSTANTS.MONGOOSE_URI, {
      serverSelectionTimeoutMS: NUM_CONSTANTS.TIMER_LIMIT,
    });
    logger.info("Mongoose DB Connected");
  } catch (err) {
    logger.error("Mongoose connection failed with error: " + err);
  }
}

export async function ensureConnectionDB() {
  try {
    if (mongoose.connection.readyState !== 1) {
      logger.info("connecting to DB");
      connectDB();
    } else {
      logger.info("DB already connected");
      return;
    }
  } catch (error) {
    logger.error("db connection failed with error: " + error);
  }
}

export async function disconnnectDB() {
  try {
    await mongoose.disconnect();
    logger.info("Mongoose DB disconnected");
  } catch (err) {
    logger.error("Mongoose DB disconnection failed with error: " + err);
  }
}
