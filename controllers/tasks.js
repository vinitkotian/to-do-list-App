const taskModel = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const taskDoc = await taskModel.create(req.body);
    res.status(200).json(taskDoc);
  } catch (e) {
    res.status(500).json({ "Error Encountered": e });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const taskList = await taskModel.find({});
    res.status(200).json({ taskList });
  } catch (e) {
    res.status(500).json({ "Error Encountered": e });
  }
};

const updateTask = async (req, res) => {
  try {
    let { id } = req.params;
    const acknowledgement = await taskModel.updateOne({ _id: id }, details);
    res.status(200).json(acknowledgement);
  } catch (e) {
    res.status(500).json({ "Error Encountered": e });
  }
};

const deleteTask = async (req, res) => {
  try {
    let { id } = req.params;
    const acknowledgement = await taskModel.deleteOne({ _id: id });
    res.status(200).json(acknowledgement);
  } catch (e) {
    res.status(500).json({ "Error encountered": e });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
