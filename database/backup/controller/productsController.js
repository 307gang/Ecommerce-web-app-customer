const db = require('../model/getAllProduct');
const dbSort = require('../model/sortProduct');

module.exports = (req, res) => {
    (async () => {
        var {sortBy, sortOrder} = req.query;
        const {cat} = req.query;
        const {p_s, p_e} = req.query
        const {brd} = req.query;
        if (sortBy){
            if (cat || p_s || brd){
                var result = await dbSort.withFilter(req);
                res.send({products: result});
            }
            else{
                var result = await dbSort.noFilter(req);
                res.send({products: result});
            }
        }
        else{
            if (cat || p_s || brd){
                var result = await db.withFilter(req);
                res.send({products: result});
            }
            else {
                var result = await db.noFilter();
                res.send({products: result});
            }
        }
    })();
}