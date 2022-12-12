const bcrypt = require("bcryptjs");
const authenDB = require("../../database/model/authenticateDB");

exports.register = async (fullname, username, password) => {
  if (await authenDB.usernameExists(username)) {
    throw new Error("Username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = authenDB.addUser(fullname, username, hashedPassword);
  return id;
};
