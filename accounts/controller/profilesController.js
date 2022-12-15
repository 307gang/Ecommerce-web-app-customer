const Ajv = require("ajv");
const format = require("ajv-formats");

// const db = require("../../database/model/usersDB");
const db = require('../../postgresdb/model/user')
const profileSchema = require("../model/profileSchema");

const ajv = new Ajv();
format(ajv);

exports.profileStep = (req, res) => {
  var { id } = req.user;
  (async () => {
    var userinfo = await db.getUserInfo(id);
    res.render("profile", { userinfo });
  })();
};

exports.profileUpdate = async (req, res) => {
  var { id } = req.user;
  if (!ajv.validate(profileSchema, req.body)) {
    return;
  }

  const { "full-name": fullname, phone, email, address } = req.body;
  try {
    await db.updateUser(id, fullname, phone, email, address);
  } catch (e) {
    return;
  }
  res.redirect("/account/info");
};
