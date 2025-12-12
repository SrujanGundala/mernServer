import { incrementModel } from "../db_connection/models.js";

export async function user_sequence() {
  const sequence = await incrementModel.findOneAndUpdate(
    { id: "auto_value" },
    { $inc: { userId: 1 } },
    { new: true, upsert: true }
  );
  return sequence;
}

export async function course_sequence() {
  const sequence = await incrementModel.findOneAndUpdate(
    { id: "auto_value" },
    { $inc: { courseId: 1 } },
    { new: true, upsert: true }
  );
  return sequence;
}
