// const db = require('../../database/model/getSameCategory');
const db = require('../../database/model/product')

module.exports = async (req) => {
  var result = await db.getSameCategoryProduct(req.params.id);    
  return result;
}