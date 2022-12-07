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

const getProductsList = require('../model/getProductList');
const getSortProductList = require('../model/getSortProductList')
const getCategoryList = require('../model/getCategoryList');
const getBrandList = require('../model/getBrandList');

module.exports = (req, res) => {
  (async () => {
    const categoryList = await getCategoryList(req);
    const brandList = await getBrandList(req);
    const {search, sortBy, sortOrder} = req.query;
    if (sortBy != ""){
      var result = await getSortProductList(req);
      res.render("all-product", {product_list: result.products, originalUrl: req.baseUrl, category_list: categoryList.categories, brand_list: brandList.brands});
    }
    else{
      var result = await getProductsList(req);
      res.render("all-product", {product_list: result.products, originalUrl: req.baseUrl, category_list: categoryList.categories, brand_list: brandList.brands});
    }
  })();
};
