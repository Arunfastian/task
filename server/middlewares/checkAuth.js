const JWT = require("jsonwebtoken");
const { verifyToken } = require("../utils/authUtils");
const dotenv = require('dotenv')

dotenv.config();

const checkAuth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) { 
      res.send("Token not found");
    } else {
      const data = verifyToken(token);
      if (data) {
        req.user = data;
        next();
      } else {
        res.send("Invalid Token");
        return;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkAuth;