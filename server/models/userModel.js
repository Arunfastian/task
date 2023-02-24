const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age:{
    type: Number,
  },
  isSuper:{
    type: Boolean,
    default: false
  },
  enabled: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("user", user);