module.exports = async (req) => {
    var {sortBy, sortOrder} = req.query;
    var url = req.protocol + '://' + req.get('host') + '/database/products?sortBy=' + sortBy + '&sortOrder=' + sortOrder;
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    var result = response.json();
    console.log(result)
    return result;

}