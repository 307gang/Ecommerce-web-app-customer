const db = require('../model/getProductById');

module.exports = (req, res, next) => {
    console.log("get products by id");
    (async () => {
        var {product_id} = req.params
        var result = db(product_id);
        if (!result) return next(createError(404));
        res.send(result);
    })();
}