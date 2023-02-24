const mongoose = require("mongoose");

require("../models/taskModel");
const Task = mongoose.model("task");
require("../models/userModel");
const User = mongoose.model("user"); 

const addTask = async (req, res) => {
  try {
    const { userName } = req.user;
    const checkUser = await User.findOne({ userName: userName });
    if (!checkUser.isSuper) {
      res.status(500).json({ messege: "Only Super User Can Add User!" });
    } else {
      const exisitingTask = await Task.findOne({ title: req.body.title });
      if (exisitingTask) {
        res.status(500).json({ messege: "Title Already Used!" });
      } else {
        if (req.body.dueDate < Date.now()) {
          req.body.status = "Expired";
          console.log("Date Compare");
        }
        const task = new Task({
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
          assignedTo: req.body.assignedTo,
        });

        const savedTask = await task.save();
        const { title, description, dueDate, assignedTo } = savedTask;
        res.status(200).json({ title, description, dueDate, assignedTo });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const changeStatus = async (req, res) => {
  try {
    const updatedTask = await Task.updateOne(
      { title: req.params.title },
      { status: req.body.status }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!");
  }
};
const callUpdate = async (value) => {
  const updatedTask = await Task.findOneAndUpdate(
    { title: value },
    { status: "Expired" }
  );
  console.log("updatedTask",updatedTask);
  return updatedTask;
};
const getTasks = async (req, res) => {
  try {
    const { userName } = req.user;
    const currentUser = await User.findOne({ userName: userName });
    if (currentUser.isSuper) {
      const tasks = await Task.find();
      for(var i = 0;i<tasks.length;i++){
        if(tasks[i].dueDate < Date.now() && tasks[i].status !== "Expired"){
          const updatedTask = await callUpdate(tasks[i].title);
          tasks[i].status = "Expired";
        }
      }
      res.status(200).json(tasks);
    } else {
      const tasks = await Task.find({ assignedTo: userName });
      for(var i = 0;i<tasks.length;i++){
        if(tasks[i].dueDate < Date.now() && tasks[i].status !== "Expired"){
          const updatedTask = await callUpdate(tasks[i].title);
          tasks[i].status = "Expired";
        }
      }
      res.status(200).json(tasks);
    }
  } catch (error) {
    console.error(error);
    res.status(200).send("Internal Server Error!");
  }
};

module.exports = { addTask, changeStatus, getTasks };
