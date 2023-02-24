const express = require("express");
const router = express.Router();
const {
  addUser,
  logIn,
  toggleEnable,
  getUsers,
} = require("../controllers/userControllers");
const checkAuth = require("../middlewares/checkAuth");
router.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

router.post("/addUser", checkAuth, addUser);
router.post("/logIn", logIn);
router.patch("/toggleEnable/:userName", toggleEnable);
router.get("/getUsers",checkAuth,getUsers);
module.exports = router;
