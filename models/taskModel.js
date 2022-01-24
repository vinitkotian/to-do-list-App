const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task must have name."],
    trim: true,
    maxlength: [20, "Name can't exceed 20 chars"],
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const taskModel = new mongoose.model("task-docs", taskSchema);

module.exports = taskModel;
