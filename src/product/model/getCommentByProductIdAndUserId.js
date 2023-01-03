const db = require("../../database/model/product");

module.exports = async (req) => {
  var { product_id } = req.params;
  var { user_id } = req.params;
  var result = await db.getCommentByProductIdAndUserId(product_id, user_id);
  return result;
};
