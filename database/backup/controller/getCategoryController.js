const db = require('../model/getAllCategory');

module.exports = (req, res) => {
    (async () => {
        var result = await db();    
        res.send({categories: result});
    })();
}