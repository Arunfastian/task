const express = require("express");
const {
  addTask,
  changeStatus,
  getTasks,
} = require("../controllers/taskControllers");
const checkAuth = require("../middlewares/checkAuth");

const Router = express.Router();

Router.post("/addTask", checkAuth, addTask);
Router.patch("/changeStatus/:title", checkAuth, changeStatus);
Router.get("/getTasks", checkAuth, getTasks);

module.exports = Router;
