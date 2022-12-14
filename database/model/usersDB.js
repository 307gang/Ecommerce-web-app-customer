const db = require('./database')

exports.updateUser = async (id, password, email, fullname, phone, address) => {
    await db.connection.execute(
        "update users set password = ? where uuid = ?",
        [password, id]
      );
    
    await db.connection.execute(
        "update customers set full_name = ?, phone_number = ?, email = ?, address = ? where uuid = ?",
        [fullname, email, phone, address, id]
    );
}

exports.getUserInfo = async (id) => {
    var result = await db.connection.execute("select c.* from customers c where c.uuid = ? ", [id]);
    return result[0][0];
}