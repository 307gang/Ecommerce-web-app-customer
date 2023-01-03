const db = require("../../database/model/carts");

module.exports = async (req) => {
  var { id: product_id } = req.params;
  var { id } = req.user;
  var result = await db.addCart(id, product_id, 1);
};
