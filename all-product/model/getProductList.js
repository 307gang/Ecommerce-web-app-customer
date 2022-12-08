const dbSort = require('../../database/model/sortProduct');
const db = require('../../database/model/getAllProduct');

module.exports = async (req) => {
    //===================== OLD CODE (MAY USE FOR AJAX) ====================================
    // var url = req.protocol + '://' + req.get('host') + '/database/products?' + queryString;
    // const response = await fetch(url, {
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // });
    // var result = response.json();
    // return result;
    //======================================================================================
    var {sortBy, sortOrder} = req.query;
    const {cat} = req.query;
    const {p_s, p_e} = req.query
    const {brd} = req.query;
    if (sortBy){
        if (cat || p_s || brd){
            var result = await dbSort.withFilter(req);
            // res.send({products: result});
            return result;
        }
        else{
            var result = await dbSort.noFilter(req);
            //res.send({products: result});
            return result;
        }
    }
    else{
        if (cat || p_s || brd){
            var result = await db.withFilter(req);
            // res.send({products: result});
            return result;
        }
        else {
            var result = await db.noFilter();
            // res.send({products: result});
            return result;
        }
    }
}