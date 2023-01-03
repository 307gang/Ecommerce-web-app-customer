var model = require("../model/addComment");

module.exports = async (req, res) => {
  const { id } = req.params;
  console.log("adding comment");
  if (!req.user) res.redirect("/account/login");
  else await model(req);
  res.redirect(`/product/${id}`);
};
