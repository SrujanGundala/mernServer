import mongoose, { Schema } from "mongoose";

const user_schema = new Schema({
  id: { type: Number, unique: true },
  user: String,
  city: String,
});

const course_schema = new Schema({
  name: String,
  images: [String],
});

const increment_schema = new Schema({
  id: String,
  userId: Number,
  courseId: Number,
});

export const userModel = mongoose.model("user", user_schema);

export const courseModel = mongoose.model("course", course_schema);

export const incrementModel = mongoose.model("sequence", increment_schema);
