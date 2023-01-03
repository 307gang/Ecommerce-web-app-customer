const db = require("../../database/model/product");

module.exports = async (req) => {
  var { id: product_id } = req.params;
  var { id } = req.user;
  var { comment } = req.body;
  var result = await db.addComment(product_id, id, comment);
};
