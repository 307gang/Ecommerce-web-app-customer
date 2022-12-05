const db = require('./database');

module.exports = async () => {
    const result = await db.connection.execute("select * from products");
    console.log(result);
    return result[0];
}