const db = require("./database");

module.exports = async (id) => {
  const result = await db.connection.execute(
    "select pd.* from products pd, category_product cpd1, category_product cpd2 where cpd1.product_id = ? and cpd2.category_id = cpd1.category_id and pd.product_id = cpd2.product_id",
    [id]
  );
  return result[0];
};
