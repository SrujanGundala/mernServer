import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import config from "config";
export async function connectDB() {
  const uri = config.get("db_uri_local");
  const connectionTimeOut = config.get("db_timeout_limit");
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: connectionTimeOut,
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
