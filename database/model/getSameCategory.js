const db = require('./database');

module.exports = async (id) => {
    const result = await db.connection.execute("select * from categories where id = ?", [id]);
    return result[0];
}
