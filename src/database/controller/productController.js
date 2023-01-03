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
  const { search } = req.query;
  if (sortBy) {
    if (cat || p_s || brd) {
      var result = await model.getAllProductSortedWithFilter(req);
      res.send({ products: result });
    } else {
      var result = await model.getAllProductSorted(req);
      res.send({ products: result });
    }
  } else {
    if (cat || p_s || brd || search) {
      var result = await model.getAllProductWithFilter(req);
      res.send({ products: result });
    } else {
      var result = await model.getAllProduct(req);
      res.send({ products: result });
    }
  }
};

module.exports.totalProduct = async (req, res) => {
  const { cat } = req.query;
  const { p_s, p_e } = req.query;
  const { brd } = req.query;
  const { search } = req.query;
  if (cat || p_s || brd || search) {
    var result = await model.totalProductWithFilter(req);
    res.send(result);
  } else {
    var result = await model.totalProduct(req);
    res.send(result);
  }
};

module.exports.getCommentByProductIdAndUserId = async (req, res) => {
  var result = await model.getCommentByProductIdAndUserId(req);
  res.send(result);
};
