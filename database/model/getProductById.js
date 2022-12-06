const db = require('./database');

module.exports = async (id) => {
    const result = await db.connection.execute("select * from products where product_id = ?", [id]);
    return result[0][0];
}