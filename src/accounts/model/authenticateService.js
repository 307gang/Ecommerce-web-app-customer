const bcrypt = require("bcryptjs");
const db = require("../../database/model/user");


exports.register = async (email, password, fullname, phone, address) => {
  if (await db.emailExists(email)) {
    throw new Error("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = await db.addUser(email, hashedPassword, fullname, phone, address);
  return id;
};

// TODO: check banned user
exports.checkUserCredentials = async (email, password) => {
  const user = await db.getUserByEmail(email);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
};

exports.emailExists = (email) => {
  db.emailExists(email);
};

exports.updatePassword = async (id, oldPassword, newPassword) => {
  const salt = await bcrypt.genSalt(10);
  const user = await db.getUserById(id);
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return 404;
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  const code = await db.updatePassword(id, hashedNewPassword);
  return code;
};

