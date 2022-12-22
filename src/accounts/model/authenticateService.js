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

exports.checkUserCredentials = async (email, password) => {
  console.log(email, password);
  const user = await db.getUserByEmail(email);
  console.log(user);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
};

exports.emailExists = (email) => {
  db.emailExists(email);
};
