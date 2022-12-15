const model = require('../model/brand');

module.exports.getAllBrand = async (req, res) => {
    var result = model.getAllBrand();
    res.send({brands: result});
}