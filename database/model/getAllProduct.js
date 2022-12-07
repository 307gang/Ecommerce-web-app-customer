const db = require('./database');

module.exports.noFilter = async () => {
    const result = await db.connection.execute("select * from products");
    return result[0];
}

module.exports.withFilter = async (req) => {
    const {cat} = req.query;
    const {p_s, p_e} = req.query
    const {brd} = req.query;
    var filter_sql = "where "; var first_fil = false;
    if (cat){
        filter_sql = filter_sql + `(category_product.category_id = ${cat} and category_product.product_id = products.product_id)`;
        first_fil = true;
    }
    if (p_s && p_e){
        if (first_fil){
            filter_sql = filter_sql + ' and ';
        }
        filter_sql = filter_sql + `(products.price between ${p_s} and ${p_e})`;
        first_fil = true;
    }
    if (brd){
        if (first_fil){
            filter_sql = filter_sql + ' and ';
        }
        filter_sql = filter_sql + `products.brand_id = ${brd}`;
    }
    const result = await db.connection.execute(`select distinct products.* from products, category_product ${filter_sql}`);
    return result[0];
}