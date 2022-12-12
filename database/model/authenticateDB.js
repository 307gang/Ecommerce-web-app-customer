const db = require("./database");

async function randomID(){
  return Math.floor(100000 + Math.random() * 900000);
}

async function generateUUID(){
  var uuids = await db.connection.execute('select uuid from users');
  while (true){
    var id = await randomID();
    for (let i =0; i <= uuids[0].length; i++){
      if (id == uuids[0][i]) continue;
    }
    return id;
  }
}

exports.usernameExists = async (username) => {
  const result = await db.connection.execute(
    "select * from `users` where `username` = ?",
    [username]
  );
  return result[0].length > 0;
};

exports.addUser = async (username, password, fullname) => {

  var id = await generateUUID();
  
  await db.connection.execute(
    "insert into `users` (uuid, username, password, admin) values (?, ?, ?, 0)",
    [id, username, password]
  );

  await db.connection.execute("insert into customers (uuid, full_name) values (?, ?)", [id, fullname]);

  return id;
};

exports.getUserByUsername = async (username) => {
  const result = await db.connection.execute(
    "select * from `users` where `username` = ? limit 1",
    [username]
  );
  return result[0] && result[0][0];
};
