const Ajv = require("ajv");
const format = require("ajv-formats");

const authenModel = require("../model/authenticateService");
const registerSchema = require("../model/authenticateSchema");

const ajv = new Ajv();
format(ajv);

exports.registerStep = (req, res) => {
  res.render("register");
};

exports.register = async (req, res) => {
  if (!ajv.validate(registerSchema, req.body)) {
    res.render("register", { error: "Invalid input" });
    return;
  }
  const { "full-name": fullname, phone, address, email, password } = req.body;
  console.log(req.body);
  try {
    await authenModel.register(email, password, fullname, phone, address);
  } catch (e) {
    res.render("register", { error: e.message });
    return;
  }
  res.redirect("/account/login");
};

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
  });
  res.redirect("/");
};

exports.verifyEmail = async (req, res) => {
  const { email } = req.params;
  const result = await authenModel.emailExists(email);
  res.json(!result);
};
