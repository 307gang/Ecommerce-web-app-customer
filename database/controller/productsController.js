const db = require('../model/getAllProduct');
const dbSort = require('../model/sortProduct');

module.exports = (req, res) => {
    (async () => {
        var {sortBy, sortOrder} = req.query;
        console.log(sortBy);
        if (sortBy){
            var result = await dbSort(sortBy, sortOrder);
            res.send({products: result});
        }
        else{
            var result = await db();
            res.send({products: result});
        }
    })();
}