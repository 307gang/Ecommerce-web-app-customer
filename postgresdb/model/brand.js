const db = require('./database');

module.exports.getAllBrand = async () => {
    const {rows}= await db.query("select * from brands");
    return rows;
}