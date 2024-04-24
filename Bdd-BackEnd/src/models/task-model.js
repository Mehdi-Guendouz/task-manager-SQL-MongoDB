import mongoose from "mongoose";
const importanceEnum = ["low", "medium", "high"];

const taskSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  importance: {
    type: String,
    enum: importanceEnum, // Use the defined importance enum
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // Set timestamp on creation
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
