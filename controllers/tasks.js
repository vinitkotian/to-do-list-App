const taskModel = require("../models/taskModel");
const asyncWrapper = require("../middlewares/asyncWrapper");

const createTask = asyncWrapper(async (req, res) => {
  const taskDoc = await taskModel.create(req.body);
  res.status(200).json(taskDoc);
});

const getAllTasks = asyncWrapper(async (req, res) => {
  const taskList = await taskModel.find({});
  res.status(200).json({ taskList });
});

const updateTask = asyncWrapper(async (req, res) => {
  let { id } = req.params,
    details = req.body;
  const acknowledgement = await taskModel.updateOne(
    { _id: id },
    {
      $set: {
        name: details.name,
        status: details.status,
        description: details.description,
      },
    },
    {
      runValidators: true,
    }
  );
  res.status(200).json(acknowledgement);
});

const deleteTask = asyncWrapper(async () => {
  let { id } = req.params;
  const acknowledgement = await taskModel.deleteOne({ _id: id });
  res.status(200).json(acknowledgement);
});

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
