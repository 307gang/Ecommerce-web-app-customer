const Ajv = require("ajv");
const format = require("ajv-formats");

const db = require("../../database/model/user");
const profileSchema = require("../model/profileSchema");
const passwordSchema = require("../model/passwordSchema");
const udpwd = require("../model/authenticateService");

const ajv = new Ajv();
format(ajv);

exports.profileStep = (req, res) => {
  if (!req.user) res.redirect("/account/login");

  var { id } = req.user;
  (async () => {
    var userinfo = await db.getUserInfo(id);
    res.render("profile", { userinfo });
  })();
};

exports.profileUpdate = async (req, res) => {
  var { id } = req.user;
  if (!ajv.validate(profileSchema, req.body)) return;

  const { "full-name": fullname, phone, email, address } = req.body;
  try {
    await db.updateUser(id, fullname, phone, email, address);
  } catch (e) {
    return;
  }
  res.redirect("/account/info");
};

exports.passwordStep = (req, res) => {
  if (!req.user) res.redirect("/account/login");
  var { error } = req.query;
  if (error) res.render("updatePassword", { error });
  else res.render("updatePassword");
};

exports.passwordUpdate = async (req, res) => {
  const { id } = req.user;
  if (!ajv.validate(passwordSchema, req.body)) {
    res.redirect("/account/updatePassword?error=403"); // thiếu điều kiện
  }

  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (newPassword != confirmNewPassword) {
    res.redirect("/account/updatePassword?error=405"); // 2 mật khẩu mới không khớp
  }

  const code = await udpwd.updatePassword(id, oldPassword, newPassword);
  try {
    if (code == 200) res.redirect("/account/info");
    res.redirect("/account/updatePassword?error=404"); // mật khẩu sai
  } catch (e) {
    console.log(e);
    // res.redirect("/");
  }
};
