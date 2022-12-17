$(document).ready(() => {
    Handlebars.registerHelper("multiply", function (a, b) {
        return a * b;
    });

    $.get('/js/generate.handlebars').then(async (src) => {
        var template= Handlebars.compile(src);
        var order = $('#order-state').val();
        var filter = $('#filter-state').val();
        console.log(order);
        console.log(filter);
        var init_query = "?", addedquery = false;
        if (filter){
            init_query =  init_query + filter;
            addedquery = true;
        }
        if (order) {
            if (addedquery) init_query = init_query + '&' + order;
            else init_query = init_query + order;
        }
        //initialize product set
        $.getJSON(`/database/products${init_query}`, (data) => {
            var context = {product_list: data.products};
            var html = template(context);
            $("#products").append(html);
        })
         //------------------------------------------------------------------------------
        // regex varible for query string
        var reg1 = /p_s=([^&]*)&p_e=([^&]*)/;
        var reg2 = /cat=([^&]*)/;
        var reg3 = /brd=([^&]*)/;
        var reg4 = /=([^&]*)/
        var reg5 = /[A-Za-z0-9]+/
        //------------------------------------------------------------------------------
        //initialize filter
        var cat = filter.match(reg2);
        if (cat){
            var temp = cat[0].match(reg4);
            var val = temp[0].match(reg5);
            $(`#cat-${val[0]}`).prop("checked", true);
        }
        else {
            $(`#cat-all`).prop("checked", true);
        }

        var p_s = filter.match(reg1);
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

        var brd = filter.match(reg3);
        if (brd){
            var temp = brd[0].match(reg4);
            var val = temp[0].match(reg5);
            $(`#brand-${val[0]}`).prop("checked", true);
        }
        else {
            $(`#brand-all`).prop("checked", true);
        }
        //------------------------------------------------------------------------------
        //filter action
        $('input[id^=price-]').change(function () {
            $('#products').empty();
            if (this.checked){
                if ($(this).data("value") != ""){
                    if (!filter) {
                        filter = `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`;
                    }
                    if (filter.includes("p_s")){

                        filter = filter.replace(reg1, `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`)
                    }
                    else{
                        filter = filter + `&p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`
                    }
                }
                else{
                    if (filter.includes("p_s")){

                        filter = filter.replace(reg1, "")
                    }
                }
                $('.price-filter').prop("checked", false);
                $(this).prop("checked", true);
                if (order){
                    $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}&${order}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
                else{
                    $.getJSON(`/database/products?${filter}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
            }
            else {
                $('#products').empty();
                $('#price-all').prop("checked", true);
                if (filter.includes("p_s")){
                    filter = filter.replace(reg1, "")
                }
                if (order){
                    $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}&${order}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
                else{
                    $.getJSON(`/database/products?${filter}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
            }   
        });

        $('input[id^=cat-]').change(function () {
            $('#products').empty();
            if (this.checked){
                if (!filter) {
                    filter = `cat=${this.value}`
                }
                if (filter.includes("cat=")){
                    filter = filter.replace(reg2, `cat=${this.value}`)
                }
                else{
                    filter = filter + `&cat=${this.value}`
                }
                $('.cat-filter').prop("checked", false);
                $(this).prop("checked", true);
                if (order){
                    $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}&${order}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
                else{
                    $.getJSON(`/database/products?${filter}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
            }
            else {
                $('#products').empty();
                $('#cat-all').prop("checked", true);
                if (filter.includes("cat=")){
                    filter = filter.replace(reg2, "")
                }
                if (order){
                    $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}&${order}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
                else{
                    $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
            }   
        });

        $('input[id^=brand-]').change(function () {
            $('#products').empty();
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
                if (order){
                    $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    })
                }
                else{
                    $.getJSON(`/database/products?${filter}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    })
                }
            }
            else {
                $('#products').empty();
                $('#brand-all').prop("checked", true);
                if (filter.includes("brd=")){
                    filter = filter.replace(reg3, "");
                    console.log(filter);
                }
                if (order){
                    $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}&${order}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
                else{
                    $.getJSON(`/database/products?${filter}` , (data) => {
                        var context = {product_list: data.products};
                        var html = template(context);
                        $("#products").append(html);
                    });
                    var url = new URL(window.location);
                    var params = new URLSearchParams(`${filter}`);
                    url.search = params;
                    window.history.pushState({}, '', url);
                }
            }   
        });
        //------------------------------------------------------------------------------
        //order action
        $('#sorted').change(function (){
            $('#products').empty();
            order = this.value;
            $.getJSON(`/database/products?${filter}&${order}` , (data) => {
                var context = {product_list: data.products};
                var html = template(context);
                $("#products").append(html);
            });
            var url = new URL(window.location);
            var params = new URLSearchParams(`${filter}&${order}`);
            url.search = params;
            window.history.pushState({}, '', url);
        });
        //------------------------------------------------------------------------------
    });
});