const db = require('./database');

module.exports = async (sortBy, sortOrder) => {
    const result = await db.connection.execute(`select * from products order by ${sortBy} ${sortOrder}`);
    return result[0];
}