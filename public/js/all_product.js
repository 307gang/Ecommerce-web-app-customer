async function getProducts(query) {
    const response = await fetch('/database/products' + query, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    const result = await response.json();
    return result;
}



$(document).ready(() => {
    Handlebars.registerHelper("multiply", function (a, b) {
        return a * b;
      });
    $.get('/js/generate.handlebars').then((src) => {
        var template= Handlebars.compile(src);
        (async () => {
            var data  = await getProducts("");
            console.log(data);
            var context = {product_list: data.products};
            var html = template(context);
            console.log(html);
            $("#products").append(html);
        })()
    })



    //filter
    var order = $('#order-state').val();
    var init_filter = $('#filter-state').val();
    var reg1 = /p_s=([^&]*)&p_e=([^&]*)/;
    var reg2 = /cat=([^&]*)/;
    var reg3 = /brd=([^&]*)/;
    var reg4 = /=([^&]*)/
    var reg5 = /[A-Za-z0-9]+/

    //initual value
    var cat = init_filter.match(reg2);
    if (cat){
        var temp = cat[0].match(reg4);
        var val = temp[0].match(reg5);
        $(`#cat-${val[0]}`).prop("checked", true);
    }
    else {
        $(`#cat-all`).prop("checked", true);
    }

    var p_s = init_filter.match(reg1);
    var p_s_v = {"0": 1, "50": 2, "100": 3, "500": 4, "1000": 5};
    if (p_s){
        var temp = p_s[0].match(reg4);
        var val = temp[0].match(reg5);
        var index = val[0];
        $(`#price-${p_s_v[index]}`).prop("checked", true);
    }
    else {
        $(`#price-all`).prop("checked", true);
    }

    var brd = init_filter.match(reg3);
    if (brd){
        var temp = brd[0].match(reg4);
        var val = temp[0].match(reg5);
        $(`#brand-${val[0]}`).prop("checked", true);
    }
    else {
        $(`#brand-all`).prop("checked", true);
    }

    //detect action
    $('input[id^=price-]').change(function () {
        var filter = $('#filter-state').val();
        console.log(filter.includes("p_s"));
        if (this.checked){
            if ($(this).data("value") != ""){
                if (!filter) {
                    filter = `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`;
                }
                if (filter.includes("p_s")){

                    filter = filter.replace(reg1, `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`)
                    console.log(filter);
                }
                else{
                    filter = filter + `&p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`
                }
            }
            else{
                if (filter.includes("p_s")){

                    filter = filter.replace(reg1, "")
                    console.log(filter);
                }
            }
            $('.price-filter').prop("checked", false);
            $(this).prop("checked", true);
            console.log($(this).data("value").start);
            console.log($(this).data("value").end);
            if (order)
                window.location.href = `/all-product?${filter}&${order}`;
            else
                window.location.href = `/all-product?${filter}`
        }
        else {
            var filter = $('#filter-state').val();
            $('#price-all').prop("checked", true);
            if (filter.includes("p_s")){
                filter = filter.replace(reg1, "")
                console.log(filter);
            }
            if (order)
                window.location.href = `/all-product?${filter}&${order}`;
            else
                window.location.href = `/all-product?${filter}`
        }   
            
    });

    $('input[id^=cat-]').change(function () {
        var filter = $('#filter-state').val();
        if (this.checked){
            if (!filter) {
                filter = `cat=${this.value}`
            }
            if (filter.includes("cat=")){
                filter = filter.replace(reg2, `cat=${this.value}`)
                console.log(filter);
            }
            else{
                filter = filter + `&cat=${this.value}`
            }
            $('.cat-filter').prop("checked", false);
            $(this).prop("checked", true);
            if (order)
                window.location.href = `/all-product?${filter}&${order}`;
            else
                window.location.href = `/all-product?${filter}`
        }
        else {
            var filter = $('#filter-state').val();
            $('#cat-all').prop("checked", true);
            if (filter.includes("cat=")){
                filter = filter.replace(reg2, "")
                console.log(filter);
            }
            if (order)
                window.location.href = `/all-product?${filter}&${order}`;
            else
                window.location.href = `/all-product?${filter}`
        }   
    });

    $('input[id^=brand-]').change(function () {
        var filter = $('#filter-state').val();
        if (this.checked){
            if (!filter) {
                filter = `brd=${this.value}`
            }
            if (filter.includes("brd=")){
                
                filter = filter.replace(reg3, `brd=${this.value}`)
                console.log(filter);
            }
            else{
                filter = filter + `&brd=${this.value}`
            }
            $('.brand-filter').prop("checked", false);
            $(this).prop("checked", true);
            console.log(this.value);
            if (order)
                window.location.href = `/all-product?${filter}&${order}`;
            else
                window.location.href = `/all-product?${filter}`
        }
        else {
            var filter = $('#filter-state').val();
            $('#brand-all').prop("checked", true);
            if (filter.includes("brd=")){
                filter = filter.replace(reg3, "")
                console.log(filter);
            }
            if (order)
                window.location.href = `/all-product?${filter}&${order}`;
            else
                window.location.href = `/all-product?${filter}`
        }   
    });


  
});