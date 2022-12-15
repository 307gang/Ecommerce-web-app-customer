const db = require('../model/getAllBrand');

module.exports = (req, res) => {
    (async () => {
        var result = await db();    
        res.send({brands: result});
    })();
}