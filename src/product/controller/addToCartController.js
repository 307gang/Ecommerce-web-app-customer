var model = require("../model/addToCart");

module.exports = async (req, res) => {
  if (!req.user) res.redirect("/account/login");
  else await model(req);
};
