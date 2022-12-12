const db = require('./database');

exports.usernameExists = async (username) => {
    const result = await db.connection.execute("select * from `users` where `username` = ?", [username]);
    return result[0].length > 0;
}

exports.addUser = async (fullname, username, password) => {
    const result = await db.connection.execute("insert into `users` (`fullname`, `username`, `password`) values (?, ?, ?)", [fullname, username, password]);
    return result[0].insertId;
}