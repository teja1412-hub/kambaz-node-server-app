import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    availableFrom: Date,
    dueDate: Date,
    availableUntil: Date,
    points: Number,
    description: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;