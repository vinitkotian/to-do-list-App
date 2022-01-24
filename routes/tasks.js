const express = require("express");

const taskRouter = express.Router();

const { createTask, getAllTasks, updateTask } = require("../controllers/tasks");

taskRouter.post("/", createTask);

taskRouter.get("/", getAllTasks);

taskRouter.put("/", updateTask);

module.exports = taskRouter;
