const db = require("./database");

module.exports.getCart = async (id) => {
  var { rows } = await db.query("select * from carts where customer_id = $1", [
    id,
  ]);
  return rows;
};

module.exports.updateQuantity = async (id, product_id, quantity) => {
  await db.query(
    "update carts set quantity = $3 where customer_id = $1 and product_id = $2",
    [id, product_id, quantity]
  );
};

module.exports.addCart = async (id, product_id, quantity) => {
  var { rows } = await db.query(
    "select * from carts where customer_id = $1 and product_id = $2",
    [id, product_id]
  );
  if (rows[0]) {
    this.updateQuantity(id, product_id, rows[0].quantity + quantity);
  } else
    await db.query(
      "insert into carts (customer_id, product_id, quantity) values ($1, $2, $3)",
      [id, product_id, quantity]
    );
};
