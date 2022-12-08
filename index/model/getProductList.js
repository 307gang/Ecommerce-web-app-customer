const db = require('../../database/model/getAllProduct');

module.exports = async (req) => {
  var result = await db.noFilter();
  return result;
}