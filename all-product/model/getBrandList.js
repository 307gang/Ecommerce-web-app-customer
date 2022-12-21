const db = require('../../database/model/brand');

module.exports = async (req) => {
    var result = await db.getAllBrand();    
    return result;
}