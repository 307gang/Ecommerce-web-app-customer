const Ajv = require("ajv");
const format = require("ajv-formats");

const authenModel = require("../model/authenticateService");
const registerSchema = require("../model/authenticateSchema");

const ajv = new Ajv();
format(ajv);

exports.registerStep = (req, res) => {
  res.render("account/register");
};

exports.register = async (req, res) => {
  if (!ajv.validate(registerSchema, req.body)) {
    res.render("account/register", { error: "Invalid input" });
    return;
  }
  const { "full-name": fullname, username, password } = req.body;
  try {
    await authenModel.register(fullname, username, password);
  } catch (e) {
    res.render("account/register", { error: e.message });
    return;
  }
  res.redirect("/");
};

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
  });
  res.redirect("/");
};
