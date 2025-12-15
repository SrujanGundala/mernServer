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

function hideInternalFields(schema) {
  schema.set("toJSON", {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
  schema.set("toObject", {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
}
mongoose.plugin(hideInternalFields);

export const userModel = mongoose.model("user", user_schema);

export const courseModel = mongoose.model("course", course_schema);

export const sequenceModel = mongoose.model("sequence", sequence_schema);
