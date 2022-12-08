const db = require('../../database/model/getAllBrand');

module.exports = async (req) => {
    var result = await db();    
    return result;
}