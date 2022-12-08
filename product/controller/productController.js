var getProductById = require('../model/getProductById');
var getRelatedProduct = require('../model/getRelatedProduct')
const createError = require("http-errors");

module.exports = (req, res, next) => {
    (async () => {
        const product = await getProductById(req);
        const related_products = await getRelatedProduct(req);
        if (product.error == 404) next(createError(404));
        res.render('productDetail', {product, related_products});
    })();
}