const db = require('../../database/model/category');

module.exports = async (req) => {
    var result = await db.getAllCategory();    
    return result;
}