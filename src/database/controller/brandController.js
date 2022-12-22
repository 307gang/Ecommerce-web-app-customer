const model = require('../model/brand');

module.exports.getAllBrand = async (req, res) => {
    var result = await model.getAllBrand();
    res.send({brands: result});
}