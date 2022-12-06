const db = require('../model/getAllProduct');

module.exports = (req, res) => {
    console.log("get products/");
    (async () => {
        var result = await db();
        res.send({products: result});
    })();
}