const model1 = require("../model/getCart");
const model2 = require("../model/getProductById");

module.exports = async (req, res) => {
  if (!req.user) res.redirect("/account/login");
  var { id } = req.user;
  var carts = await model1(id);
  var products = [];
  for (const value of carts) {
    var product = await model2(value.product_id);
    var { product_name, product_image, price } = product;
    products.push({
      product_name: product_name,
      product_image: product_image,
      price: price,
      quantity: value.quantity,
    });
  }
  console.log(products);
  res.render("cart", { total: products.length, products });
};
