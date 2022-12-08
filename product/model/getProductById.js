const db = require('../../database/model/getProductById');

module.exports = async (req) => {
  var {id} = req.params
  var result =  await db(id);
  if (!result) return res.send({error: 404});
  return result;
}