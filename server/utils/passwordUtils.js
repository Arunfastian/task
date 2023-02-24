const {hash,compare,genSalt} = require("bcrypt");

const hashPassword = async (password) => {
  
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
};

const passwordCompare = async (enteredPass, originalPass) => {
  const result = await compare(enteredPass, originalPass);
  return result;
};



module.exports = {passwordCompare,hashPassword};