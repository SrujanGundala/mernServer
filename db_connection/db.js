import mongoose from "mongoose";
import { OBJ_CONSTANTS } from "../constants.js";

export async function connectDB() {
  try {
    await mongoose.connect(OBJ_CONSTANTS.MONGOOSE_URI);
    console.log("Mongoose connected to DB");
  } catch (err) {
    console.error("Mongoose connection error:", err);
  }
}

export async function disconnnectDB() {
  try {
    await mongoose.disconnect();
    console.log("Mongoose disconnected to DB");
  } catch (err) {
    console.error("Mongoose connection error:", err);
  }
}
