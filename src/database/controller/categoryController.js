const model = require('../model/category');

module.exports.getAllCategory = async (req, res) => {
    var result = await model.getAllCategory();
    res.send({categories: result});
}