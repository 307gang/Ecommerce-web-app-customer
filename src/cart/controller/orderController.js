const model = require("../model/addOrder");

module.exports = async (req, res) => {
  const { id } = req.user;
  try {
    await model(id);
  } catch (e) {
    console.log(e);
    res.redirect("/cart");
  }
  res.redirect("/cart/checkout");
};
