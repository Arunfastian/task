const { hashPassword, passwordCompare } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/authUtils");
const mongoose = require("mongoose");

require("../models/userModel");
const User = mongoose.model("user");
const addUser = async (req, res) => {
  try {
    const { userName } = req.user;
    const checkUser = await User.findOne({ userName: userName });
    if (!checkUser.isSuper) {
      res
        .status(200)
        .json({ status: -1, messege: "Only Super User Can Add User!" });
    } else {
      const hashedPassword = await hashPassword(req.body.password);
      const exists = await User.findOne({ userName: req.body.userName });
      if (exists) {
        res.status(200).json({ status: 1, messege: "userName already used" });
      } else {
        const user = new User({
          name: req.body.name,
          userName: req.body.userName,
          password: hashedPassword,
          age: req.body.age,
        });
        const savedUser = await user.save();
        const { userName, name, age, isSuper, enabled } = savedUser;
        res
          .status(200)
          .json({ status: 0, userName, name, age, isSuper, enabled });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const logIn = async (req, res) => {
  try {
    const exists = await User.findOne({ userName: req.body.userName });
    if (exists) {
      if (exists.enabled !== true) {
        res.status(200).json({ status: 1, messege: "User is Disabled!" });
      } else {
        const passResult = await passwordCompare(
          req.body.password,
          exists.password
        );
        if (passResult) {
          const authToken = generateToken(exists.userName);
          res.status(200).json({
            status: 0,
            messege: "Logged In",
            authToken,
            userName: exists.userName,
            enabled: exists.enabled,
            isSuper: exists.isSuper,
            name: exists.name,
            age: exists.age,
          });
        } else {
          res.status(200).json({ status: 1, messege: "Incorrect Password" });
        }
      }
    } else {
      res.status(200).json({ status: 1, messege: "UserName does not exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ status: 1, messege: "Internal Server Error" });
  }
};
const toggleEnable = async (req, res) => {
  try {
    // const { userName } = req.user;
    // const checkUser = await User.findOne({ userName: userName });
    // if (!checkUser.isSuper) {
    //   res
    //     .status(500)
    //     .json({ messege: "Only Super User Is Allowed to Enable or Disable!" });
    // } else {
    const oldUser = await User.findOne({
      userName: req.params.userName,
    });
    if (oldUser) {
      const updatedUser = await User.updateOne(
        { userName: req.params.userName },
        { enabled: !oldUser.enabled }
      );
      res.status(200).json({ messege: "Sucess", updatedUser });
    } else {
      res.status(500).json({ messege: "userName doesn't exist!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const Users = await User.find({}, { password: false });
    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { addUser, logIn, toggleEnable, getUsers };
