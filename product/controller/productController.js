var getProductById = require('../model/getProductById');
var getRelatedProduct = require('../model/getRelatedProduct')
const createError = require("http-errors");

module.exports = (req, res, next) => {
    (async () => {
        var {id} = req.params;
        const result1 = await getProductById(req, id);
        const result2 = await getRelatedProduct(req, id);
        if (result1.error == 404) next(createError(404));
        res.render('productDetail', {product: result1, related_products: result2.category});
    })();
}