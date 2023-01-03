const db = require("../../database/model/carts");

module.exports = async (id) => {
  var result = await db.getCart(id);
  return result;
};
