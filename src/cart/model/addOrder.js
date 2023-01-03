const db = require("../../database/model/carts");

module.exports = async (id) => {
  var date = new Date();
  var order_name = "Order on: " + date.toDateString();
  var order_des = "This is a order";
  await db.addOrder(id, order_name, order_des);
};
