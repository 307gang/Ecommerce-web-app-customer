const db = require('../../database/model/getSameCategory');

module.exports = async (req) => {
  var result = await db(req.params.id);    
  return result;
}