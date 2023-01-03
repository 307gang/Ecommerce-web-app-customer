const db = require("./database");
const dayjs = require("dayjs");

module.exports.getAllProduct = async () => {
  var { rows } = await db.query("select * from products");
  return rows;
};

module.exports.getAllProductWithFilter = async (req) => {
  const { cat } = req.query;
  const { p_s, p_e } = req.query;
  const { brd } = req.query;
  var filter_sql = "where ";
  var first_fil = false;
  if (cat) {
    filter_sql =
      filter_sql +
      `(category_product.category_id = '${cat}' and category_product.product_id = products.product_id)`;
    first_fil = true;
  }
  if (p_s && p_e) {
    if (first_fil) {
      filter_sql = filter_sql + " and ";
    }
    filter_sql = filter_sql + `(products.price between ${p_s} and ${p_e})`;
    first_fil = true;
  }
  if (brd) {
    if (first_fil) {
      filter_sql = filter_sql + " and ";
    }
    filter_sql = filter_sql + `products.brand_id = '${brd}'`;
  }
  const { rows } = await db.query(
    `select distinct products.* from products, category_product ${filter_sql}`
  );
  return rows;
};

module.exports.getAllProductSorted = async (req) => {
  const { sortBy, sortOrder } = req.query;
  const { rows } = await db.query(
    `select * from products order by ${sortBy} ${sortOrder}`
  );
  return rows;
};

module.exports.getAllProductSortedWithFilter = async (req) => {
  const { sortBy, sortOrder } = req.query;
  const { cat } = req.query;
  const { p_s, p_e } = req.query;
  const { brd } = req.query;
  var filter_sql = "where ";
  var first_fil = false;
  if (cat) {
    filter_sql =
      filter_sql +
      `(category_product.category_id = '${cat}' and category_product.product_id = products.product_id)`;
    first_fil = true;
  }
  if (p_s && p_e) {
    if (first_fil) {
      filter_sql = filter_sql + " and ";
    }
    filter_sql = filter_sql + `(products.price between ${p_s} and ${p_e})`;
    first_fil = true;
  }
  if (brd) {
    if (first_fil) {
      filter_sql = filter_sql + " and ";
    }
    filter_sql = filter_sql + `products.brand_id = '${brd}'`;
  }
  const { rows } = await db.query(
    `select distinct products.* from products, category_product ${filter_sql} order by products.${sortBy} ${sortOrder}`
  );
  return rows;
};

module.exports.getProductById = async (id) => {
  const { rows } = await db.query(
    "select * from products where product_id = $1",
    [id]
  );
  return rows[0];
};

module.exports.getSameCategoryProduct = async (id) => {
  const { rows } = await db.query(
    "select pd.* from products pd, category_product cpd1, category_product cpd2 where cpd1.product_id = $1 and cpd2.category_id = cpd1.category_id and pd.product_id = cpd2.product_id",
    [id]
  );
  return rows;
};

module.exports.getCommentByProductIdAndUserId = async (req) => {
  const { productid } = req.params;
  const { uuid } = req.query;
  const { rows } = await db.query(
    "select * from comments where product_id = $1 and customer_id = $2",
    [productid, uuid]
  );
  return rows[0];
};

module.exports.addComment = async (req) => {
  const { productid } = req.params;
  const { uuid } = req.query;
  const { comment } = req.body;
  var fromNow = dayjs().format("YYYY-MM-DD").fromNow();

  const { rows } = await db.query(
    "insert into comments (product_id, customer_id, comment, date) values ($1, $2, $3, $4)",
    [productid, uuid, comment, fromNow]
  );
  return rows[0];
};
