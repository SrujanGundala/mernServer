import { sequenceModel } from "../db_connection/models.js";

export async function user_sequence(action) {
  const step = action === "dec" ? -1 : 1;
  const filter =
    action === "dec"
      ? { id: "auto_value", userId: { $gt: 1 } }
      : { id: "auto_value" };
  const sequence = await sequenceModel.findOneAndUpdate(
    filter,
    { $inc: { userId: step } },
    { new: true, upsert: true }
  );
  return sequence;
}

export async function course_sequence() {
  const step = action === "dec" ? -1 : 1;
  const sequence = await sequenceModel.findOneAndUpdate(
    { id: "auto_value", courseId: { $gt: 1 } },
    { $inc: { courseId: step } },
    { new: true, upsert: true }
  );
  return sequence;
}
