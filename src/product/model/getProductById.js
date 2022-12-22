// const db = require('../../database/model/getProductById');
const db = require('../../database/model/product')

module.exports = async (req) => {
  var {id} = req.params
  var result =  await db.getProductById(id);
  return result;
}