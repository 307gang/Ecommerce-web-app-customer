const getProductsList = require('../model/getProductList');
  
module.exports = (req, res) => {
  (async () => {
    var result = await getProductsList(req);
    res.render("index", {products: result.products});
  })();
  
};
  