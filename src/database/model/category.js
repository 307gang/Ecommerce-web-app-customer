const db = require('./database');

module.exports.getAllCategory = async () => {
    const {rows} = await db.query("select * from categories");
    return rows;
}