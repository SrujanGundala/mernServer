import mongoose, { Schema } from "mongoose";

const user_schema = new Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: String,
});

const course_schema = new Schema({
  name: String,
  images: [String],
});

const sequence_schema = new Schema({
  id: String,
  userId: Number,
  courseId: Number,
});

export const userModel = mongoose.model("user", user_schema);

export const courseModel = mongoose.model("course", course_schema);

export const sequenceModel = mongoose.model("sequence", sequence_schema);
