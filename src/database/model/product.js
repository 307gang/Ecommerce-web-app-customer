const db = require("./database");

module.exports.getAllProduct = async (req) => {
  const { range, start } = req.query;
  if (range && start) {
    var { rows } = await db.query(
      "select * from products order by product_id limit $1 offset $2",
      [range, start]
    );
    return rows;
  }
  var { rows } = await db.query("select * from products order by product_id");
  return rows;
};

module.exports.getAllProductWithFilter = async (req) => {
  const { cat } = req.query;
  const { p_s, p_e } = req.query;
  const { brd } = req.query;
  const { range, start } = req.query;
  const { search } = req.query;
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

  if (search) {
    if (first_fil) {
      filter_sql = filter_sql + " and ";
    }
    filter_sql =
      filter_sql + `lower(products.product_name) like lower('%${search}%')`;
  }

  if (range && start) {
    const { rows } = await db.query(
      `select distinct products.* from products, category_product ${filter_sql} order by product_id limit $1 offset $2`,
      [range, start]
    );
    return rows;
  }
  const { rows } = await db.query(
    `select distinct products.* from products, category_product ${filter_sql}`
  );
  return rows;
};

module.exports.getAllProductSorted = async (req) => {
  const { sortBy, sortOrder } = req.query;
  const { range, start } = req.query;
  if (range) {
    const { rows } = await db.query(
      `select * from products order by ${sortBy} ${sortOrder} limit $1 offset $2`,
      [range, start]
    );
    return rows;
  }
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
  const { range, start } = req.query;
  const { search } = req.query;
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

  if (search) {
    if (first_fil) {
      filter_sql = filter_sql + " and ";
    }
    filter_sql =
      filter_sql + `lower(products.product_name) like lower('%${search}%')`;
  }

  if (range && start) {
    const { rows } = await db.query(
      `select distinct products.* from products, category_product ${filter_sql} order by products.${sortBy} ${sortOrder} limit $1 offset $2`,
      [range, start]
    );
    return rows;
  }

  const { rows } = await db.query(
    `select distinct products.* from products, category_product ${filter_sql} order by products.${sortBy} ${sortOrder}`
  );
  return rows;
};

module.exports.totalProduct = async (req) => {
  var { rows } = await db.query("select count(*) as total from products");
  return rows[0];
};

module.exports.totalProductWithFilter = async (req) => {
  const { cat } = req.query;
  const { p_s, p_e } = req.query;
  const { brd } = req.query;
  const { search } = req.query;
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

  if (search) {
    if (first_fil) {
      filter_sql = filter_sql + " and ";
    }
    filter_sql =
      filter_sql + `lower(products.product_name) like lower('%${search}%')`;
  }
  const { rows } = await db.query(
    `select count(distinct products.*) as total from products, category_product ${filter_sql}`
  );
  return rows[0];
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

module.exports.getCommentByProductId = async (id) => {
  const { rows } = await db.query(
    "select * from comments where product_id = $1 ",
    [id]
  );
  return rows;
};

module.exports.addComment = async (product_id, customer_id, comment) => {
  // const { productid } = req.params;
  // const { uuid } = req.query;
  // const { comment } = req.body;

  // dayjs.extend(relativeTime);
  // var fromNow = dayjs().fromNow();
  // // now trả ra chuỗi
  // // https://day.js.org/docs/en/display/from-now

  var { rows } = await db.query(
    "select * from comments where customer_id = $1 and product_id = $2",
    [customer_id, product_id]
  );
  if (rows[0]) {
    await db.query(
      "update comments set comment = $3, create_date = current_timestamp where product_id = $1 and customer_id = $2",
      [product_id, customer_id, comment]
    );
    return;
  }
  await db.query(
    "insert into comments (product_id, customer_id, comment, create_date) values ($1, $2, $3, current_timestamp)",
    [product_id, customer_id, comment]
  );
};
