const Ajv = require("ajv");
const format = require("ajv-formats");

const authenModel = require("../model/authenticateService");

const ajv = new Ajv();
format(ajv);

exports.registerStep = (req, res) => {
  res.render("account/register");
};

exports.register = async (req, res) => {
  const schema = {
    type: "object",
    properties: {
      "full-name": { type: "string", minLength: 1 },
      username: { type: "string", format: "text" },
      password: { type: "string", minLength: 6 },
    },
    required: ["full-name", "username", "password"],
    additionalProperties: false,
  };

  if (!ajv.validate(schema, req.body)) {
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
  // res.redirect("/");
};

