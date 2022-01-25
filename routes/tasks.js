const express = require("express");

const taskRouter = express.Router();

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

taskRouter.post("/", createTask);

taskRouter.get("/", getAllTasks);

taskRouter.put("/:id", updateTask);

taskRouter.delete("/:id", deleteTask);

module.exports = taskRouter;
