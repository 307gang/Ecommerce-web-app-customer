const db = require("../../database/model/product");

module.exports = async (req) => {
  const { cat } = req.query;
  const { p_s, p_e } = req.query;
  const { brd } = req.query;
  const { search } = req.query;
  if (cat || p_s || brd || search) {
    var result = await db.totalProductWithFilter(req);
    // res.send({products: result});
    return result;
  } else {
    var result = await db.totalProduct(req);
    //res.send({products: result});
    return result;
  }
};
