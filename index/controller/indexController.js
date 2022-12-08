const getProductsList = require('../model/getProductList');
  
module.exports = (req, res) => {
  (async () => {
    var products = await getProductsList(req);
    res.render("index", {products});
  })();
  
};
  