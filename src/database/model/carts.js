const db = require("./database");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function genOrderId() {
  var { rows } = await db.query("select * from orders");
  while (true) {
    var exist = false;
    var id = makeid(4);
    for (const row of rows) {
      if (id == row.order_id) exist = true;
    }
    if (exist) continue;
    return id;
  }
}

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

module.exports.addOrder = async (customer_id, order_name, description) => {
  console.log(customer_id, order_name, description);
  var id = await genOrderId();
  var rows = await this.getCart(customer_id);
  if (rows.length == 0) return;
  await db.query(
    "insert into orders (order_id, order_name, description, customer_id, status) values ($1, $2, $3, $4, $5)",
    [id, order_name, description, customer_id, 0]
  );
  for (const product of rows) {
    await db.query(
      "insert into order_product (order_id, product_id, product_quantity) values ($1, $2, $3)",
      [id, product.product_id, product.quantity]
    );
  }
  await db.query("delete from carts where customer_id = $1", [customer_id]);
};
