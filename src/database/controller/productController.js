const model = require("../model/product");

module.exports.getProductById = async (req, res) => {
  var { id } = req.params;
  var result = await model.getProductById(id);
  if (!result) return res.send({ error: 404 });
  res.send(result);
};

module.exports.getAllProduct = async (req, res) => {
  var { sortBy, sortOrder } = req.query;
  const { cat } = req.query;
  const { p_s, p_e } = req.query;
  const { brd } = req.query;
  if (sortBy) {
    if (cat || p_s || brd) {
      var result = await model.getAllProductSortedWithFilter(req);
      res.send({ products: result });
    } else {
      var result = await model.getAllProductSorted(req);
      res.send({ products: result });
    }
  } else {
    if (cat || p_s || brd) {
      var result = await model.getAllProductWithFilter(req);
      res.send({ products: result });
    } else {
      var result = await model.getAllProduct();
      res.send({ products: result });
    }
  }
};

module.exports.getCommentByProductIdAndUserId = async (req, res) => {
    var result = await model.getCommentByProductIdAndUserId(req);
    res.send(result);
};