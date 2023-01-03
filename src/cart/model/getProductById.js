// const db = require('../../database/model/getProductById');
const db = require("../../database/model/product");

module.exports = async (id) => {
  var result = await db.getProductById(id);
  return result;
};
