const db = require("./database");

module.exports = async (id) => {
  const result = await db.connection.execute(
    "select `cpd.category_id` from `products pd`, `category_product cpd`, `categories c` where `pd.product_id` = `cpd.product_id` and `cpd.category_id` = `c.category_id` and c.category_id = ?",
    [id]
  );
  return result[0];
};
