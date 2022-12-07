// var product_list = [
//   {
//     product_name: "Áo thun xanh mint",
//     product_image: "/asset/img/ao-thun1.jpg",
//     product_price: "300.000 VNĐ",
//   },
//   {
//     product_name: "Quần jeans đen",
//     product_image: "/asset/img/quan-jean1.jpg",
//     product_price: "350.000 VNĐ",
//   },
//   {
//     product_name: "Váy JK xanh biển",
//     product_image: "/asset/img/vay-jk1.jpg",
//     product_price: "200.000 VNĐ",
//   },
//   {
//     product_name: "Váy Sunflower",
//     product_image: "/asset/img/dam-hoa.jpg",
//     product_price: "950.000 VNĐ",
//   },
//   {
//     product_name: "Quần short xám",
//     product_image: "/asset/img/quan-short1.jpg",
//     product_price: "230.000 VNĐ",
//   },
//   {
//     product_name: "Áo blazer nâu",
//     product_image: "/asset/img/ao-blazer1.jpg",
//     product_price: "500.000 VNĐ",
//   },
//   {
//     product_name: "Áo Vest xanh biển",
//     product_image: "/asset/img/ao-vest1.jpg",
//     product_price: "1.500.000 VNĐ",
//   },
//   {
//     product_name: "Quần kaki xanh đen",
//     product_image: "/asset/img/quan-kaki1.jpg",
//     product_price: "600.000 VNĐ",
//   },
// ];

const getProductList = require('../model/getProductList');
const getSortProductList = require('../model/getSortProductList')
const getCategoryList = require('../model/getCategoryList');
const getBrandList = require('../model/getBrandList');

module.exports = (req, res) => {
  (async () => {
    const categoryList = await getCategoryList(req);
    const brandList = await getBrandList(req);
    //get query parameter
    const {cat} = req.query;
    const {p_s, p_e} = req.query
    const {brd} = req.query;
    const {search} = req.query;
    const {sortBy, sortOrder} = req.query;
    //create query state
    var filter_state = ""; var first_fil = false;
    if (cat){
      filter_state = filter_state + `cat=${cat}`;
      first_fil = true;
    }
    if (p_s && p_e){
      if (first_fil){
        filter_state = filter_state + '&';
      }
      filter_state = filter_state + `p_s=${p_s}&p_e=${p_e}` ;
      first_fil = true;
    }
    if (brd){
      if (first_fil){
        filter_state = filter_state + '&';
      }
      filter_state = filter_state + `brd=${brd}`;
    }
    var order_state = "";

    if (sortBy){
      order_state = `sortBy=${sortBy}&sortOrder=${sortOrder}`;
      var result = await getProductList(req, `${filter_state}&${order_state}`);
      res.render("all-product", {product_list: result.products, originalUrl: req.baseUrl, category_list: categoryList.categories, brand_list: brandList.brands, filter_state, order_state});
    }
    else{
      var result = await getProductList(req, `${filter_state}`);
      res.render("all-product", {product_list: result.products, originalUrl: req.baseUrl, category_list: categoryList.categories, brand_list: brandList.brands, filter_state, order_state});
    }
  })();
};
