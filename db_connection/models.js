import mongoose, { Schema } from "mongoose";

const user_schema = new Schema({
  user: String,
  city: String,
});

const course_schema = new Schema({
  name: String,
  images: [String],
});

export const userModel = mongoose.model("user", user_schema);

export const courseModel = mongoose.model("course", course_schema);
