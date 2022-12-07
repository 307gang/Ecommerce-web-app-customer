const db = require("../model/getSameCategory");

module.exports = (req, res) => {
    (async () => {
        var result = await db(req.params.id);    
        res.send({category: result});
    })();
};