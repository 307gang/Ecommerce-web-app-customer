const db = require('../model/getProductById');
const createError = require("http-errors");

module.exports = (req, res, next) => {
    console.log("get products by id");
    (async () => {
        var {id} = req.params
        var result =  await db(id);
        if (!result) return res.send({error: 404});
        res.send(result);
    })();
}