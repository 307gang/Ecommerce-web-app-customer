const db = require('../../database/model/product');

module.exports = async (req) => {
  var result = await db.getAllProduct(req);
  return result;
}