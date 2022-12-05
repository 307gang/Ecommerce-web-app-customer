var product_list = [
    {
        product_name: "san pham 1",
        product_image: "/asset/img/ao-blazer1.jpg",
        product_price: "72,000"
    },
    {
        product_name: "san pham 2",
        product_image: "/asset/img/ao-thun1.jpg",
        product_price: "72,000"
    },
    {
        product_name: "san pham 3",
        product_image: "/asset/img/ao-vest1.jpg",
        product_price: "72,000"
    },
    {
        product_name: "san pham 4",
        product_image: "/asset/img/dam-hoa.jpg",
        product_price: "72,000"
    },
    {
        product_name: "san pham 5",
        product_image: "/asset/img/quan-jean1.jpg",
        product_price: "72,000"
    }
];

module.exports = (req, res) => {
    res.render('all-product', {product_list});
}