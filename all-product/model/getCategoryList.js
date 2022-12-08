const db = require('../../database/model/getAllCategory');

module.exports = async (req) => {
    var result = await db();    
    return result;
}