var rowsShown = 6;  

function pagination(rowsTotal){
    $('#nav').empty();
    var numPages = rowsTotal/rowsShown;
    // $('#nav').append('<li class="page-item disabled"><span class="page-link">Previous</span></li>');    
    for (i = 0;i < numPages;i++) {  
        var pageNum = i + 1;  
        $('#nav').append ('<li class="page-item"><a class="page-link" href="#" rel="'+i+'">' + pageNum +'</a></li>');  
    }  
    // $('#nav').append('<li class="page-item"><span class="page-link">Next</span></li>');    
    $('#list #item').hide();  
    $('#list #item').slice (0, rowsShown).show();  
    $('#nav a:first').addClass('active');
}

function updateQueryParam(queryString){
    var url = new URL(window.location);
    console.log(url);
    var params = new URLSearchParams(queryString);
    url.search = params;
    window.history.pushState({}, '', url);
}

function getUrl(path, queryString){
    var url = new URL(window.location);
    url.pathname = path;
    var params = new URLSearchParams(queryString);
    url.search = params;
    console.log(url);
    return url;
}


function updateProductList(template, data){
    $('#products').empty();
    var context = {product_list: data.products};
    var html = template(context);
    $("#products").append(html);
    pagination(data.products.length);
}

$(document).ready(() => {
    Handlebars.registerHelper("multiply", function (a, b) {
        return a * b;
    });

    $.get('/js/generate.handlebars').then(async (src) => {
        var template= Handlebars.compile(src);
        var order = $('#order-state').val();
        var filter = $('#filter-state').val();

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        console.log(params.p_s);
          
        // var init_query = "?", addedquery = false;
        // if (filter){
        //     init_query =  init_query + filter;
        //     addedquery = true;
        // }
        // if (order) {
        //     if (addedquery) init_query = init_query + '&' + order;
        //     else init_query = init_query + order;
        // }
        //initialize product set
        // $.getJSON(`/database/products${init_query}`, (data) => {updateProductList(template, data); });
        //------------------------------------------------------------------------------
        // regex varible for query string
        pagination(10);
        var priceQuery = /p_s=([^&]*)&p_e=([^&]*)/;
        var catQuery = /cat=([^&]*)/;
        var brdQuery = /brd=([^&]*)/;
        var reg1 = /=([^&]*)/, reg2 = /[A-Za-z0-9]+/;
        //------------------------------------------------------------------------------
        //initialize filter
        var cat = filter.match(catQuery);
        if (cat){
            var temp = cat[0].match(reg1);
            var val = temp[0].match(reg2);
            $(`#cat-${val[0]}`).prop("checked", true);
        }
        else {
            $(`#cat-all`).prop("checked", true);
        }

        var p_s = filter.match(priceQuery);
        var p_s_v = {"0": 1, "50": 2, "100": 3, "500": 4, "1000": 5};
        if (p_s){
            var temp = p_s[0].match(reg1);
            var val = temp[0].match(reg2);
            var index = val[0];
            $(`#price-${p_s_v[index]}`).prop("checked", true);
        }
        else {
            $(`#price-all`).prop("checked", true);
        }

        var brd = filter.match(brdQuery);
        if (brd){
            var temp = brd[0].match(reg1);
            var val = temp[0].match(reg2);
            $(`#brand-${val[0]}`).prop("checked", true);
        }
        else {
            $(`#brand-all`).prop("checked", true);
        }
        //------------------------------------------------------------------------------
        //filter action
        $('input[id^=price-]').change(function () {
            var queryString = "";
            if (this.checked){
                if ($(this).data("value") != ""){
                    if (!filter) {
                        filter = `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`;
                    }
                    if (filter.includes("p_s")){

                        filter = filter.replace(priceQuery, `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`)
                    }
                    else{
                        filter = filter + `&p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`
                    }
                }
                else{
                    if (filter.includes("p_s")){
                        filter = filter.replace(priceQuery, "")
                    }
                }
                $('.price-filter').prop("checked", false);
                $(this).prop("checked", true);
                var queryString = "";
                if (order){
                    queryString = `${filter}&${order}`;
                }
                else{
                    queryString = `${filter}`;
                }
                
            }
            else {
                $('#price-all').prop("checked", true);
                if (filter.includes("p_s")){
                    filter = filter.replace(priceQuery, "")
                }
                if (order){
                    queryString = `${filter}&${order}`;
                }
                else{
                    queryString = `${filter}`;
                }
            }  
            $.getJSON(getUrl('/database/products', `${filter}&${order}`) , (data) => {updateProductList(template, data)});
            updateQueryParam(`${filter}&${order}`);
        });

        $('input[id^=cat-]').change(function () {
            var queryString = "";
            if (this.checked){
                if (!filter) {
                    filter = `cat=${this.value}`
                }
                if (filter.includes("cat=")){
                    filter = filter.replace(catQuery, `cat=${this.value}`)
                }
                else{
                    filter = filter + `&cat=${this.value}`
                }
                $('.cat-filter').prop("checked", false);
                $(this).prop("checked", true);
                if (order){
                    queryString = `${filter}&${order}`;
                }
                else{
                    queryString = `${filter}`;
                }
            }
            else {
                $('#cat-all').prop("checked", true);
                if (filter.includes("cat=")){
                    filter = filter.replace(catQuery, "")
                }
                if (order){
                    queryString = `${filter}&${order}`;
                }
                else{
                    queryString = `${filter}`;
                }
            } 
            $.getJSON(getUrl('/database/products', `${filter}&${order}`) , (data) => {updateProductList(template, data)});
            updateQueryParam(`${filter}&${order}`);
        });

        $('input[id^=brand-]').change(function () {
            var queryString = "";
            if (this.checked){
                if (!filter) {
                    filter = `brd=${this.value}`
                }
                if (filter.includes("brd=")){

                    filter = filter.replace(brdQuery, `brd=${this.value}`)
                    console.log(filter);
                }
                else{
                    filter = filter + `&brd=${this.value}`
                }
                $('.brand-filter').prop("checked", false);
                $(this).prop("checked", true);
                if (order){
                    queryString = `${filter}&${order}`;
                }
                else{
                    queryString = `${filter}`;
                }
            }
            else {
                $('#brand-all').prop("checked", true);
                if (filter.includes("brd=")){
                    filter = filter.replace(brdQuery, "");
                    console.log(filter);
                }
                if (order){
                    queryString = `${filter}&${order}`;
                }
                else{
                    queryString = `${filter}`;
                }
            }   
            $.getJSON(getUrl('/database/products', `${filter}&${order}`) , (data) => {updateProductList(template, data)});
            updateQueryParam(`${filter}&${order}`); 
        });
        //------------------------------------------------------------------------------
        //order action
        $('#sorted').change(function (){
            $('#products').empty();
            order = this.value;
            $.getJSON(`/database/products?${filter}&${order}` , (data) => {updateProductList(template, data)});
            updateQueryParam(`${filter}&${order}`);
        });
        //------------------------------------------------------------------------------
        //pagination 
        $('#nav').on('click', 'a', function(event) {  
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            $('#nav a').removeClass('active');  
            $(this).addClass('active');  
            var currPage = $(this).attr('rel');  
            var startItem = currPage * rowsShown;  
            var endItem = startItem + rowsShown;  
            $('#list #item').animate({opacity:0}, 300).hide().slice(startItem, endItem).show().animate({opacity:1}, 300);  
            
        });  
        //source: https://www.javatpoint.com/jquery-pagination
        //------------------------------------------------------------------------------
    });
});