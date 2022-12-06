var getProductById = require('../model/getProductById');
const createError = require("http-errors");

module.exports = (req, res, next) => {
    (async () => {
        var {id} = req.params;
        const result = await getProductById(req, id);
        if (result.error == 404) next(createError(404));
        res.render('detail', {product: result});
    })();
}