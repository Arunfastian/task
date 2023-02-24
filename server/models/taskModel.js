const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const task = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
    default: ""
  },
  createDate: {
    type: Date,
    default: new Date(0)
  },
  dueDate: {
    type: Date,
    require: true
  },
  assignedTo: {
    type: String,
    require: true
  },
  status: {
    type: String,
    default: "Pending",
    require: true
  }
});

module.exports = mongoose.model("task", task);