const bcrypt = require("bcryptjs");
const db = require('../../postgresdb/model/user')

exports.register = async (username, password, fullname, phone, address) => {
  if (await db.userExists(username)) {
    throw new Error("Username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = await db.addUser(username, hashedPassword, fullname, phone, address);
  console.log(id)
  return id;
};

exports.checkUserCredentials = async (username, password) => {
  const user = await db.getUserByUsername(username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
};
