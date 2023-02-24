const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const generateToken = (userName) => {
  const data = {
    userName: userName,
  };
  const authToken = JWT.sign(data, process.env.jwt_string);
  return authToken;
};
 
const verifyToken = (authToken) => {
  const data = JWT.verify(authToken, process.env.jwt_string);
  return data
}; 
 

module.exports = {generateToken, verifyToken};