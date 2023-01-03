var getProductById = require("../model/getProductById");
var getRelatedProduct = require("../model/getRelatedProduct");
var getComment = require("../model/getComment");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  (async () => {
    const product = await getProductById(req);
    const related_products = await getRelatedProduct(req);
    const comments = await getComment(req);
    if (!product) next(createError(404));
    res.render("productDetail", { product, related_products, comments });
  })();
};
