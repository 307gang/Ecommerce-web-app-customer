const db = require('./database')

exports.updateUser = async (id, fullname, phone, email, address) => {
    await db.connection.execute(
        "update customers set full_name = ?, phone_number = ?, email = ?, address = ? where uuid = ?",
        [fullname, phone, email, address, id]
    );
}

exports.getUserInfo = async (id) => {
    var result = await db.connection.execute("select c.* from customers c where c.uuid = ? ", [id]);
    return result[0][0];
}