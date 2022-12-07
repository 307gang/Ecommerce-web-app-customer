$(document).ready(() => {
    
    var order = $('#order-state').val();
    console.log($('#filter-state').val());
    console.log($('#order-state').val())

    $('input[id^=price-]').change(function () {
        var filter = $('#filter-state').val();
        console.log(filter.includes("p_s"));
        if (this.checked){
            if (!filter) {
                filter = `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`;
            }
            if (filter.includes("p_s")){
                var reg = /p_s=([^&]*)&p_e=([^&]*)/;
                filter = filter.replace(reg, `p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`)
                console.log(filter);
            }
            else{
                filter = filter + `&p_s=${$(this).data("value").start}&p_e=${$(this).data("value").end}`
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
            $('#price-all').prop("checked", true);
        }   
            
    });

    $('input[id^=cat-]').change(function () {
        var filter = $('#filter-state').val();
        if (this.checked){
            if (!filter) {
                filter = `cat=${this.value}`
            }
            if (filter.includes("cat=")){
                var reg = /cat=([^&]*)/
                filter = filter.replace(reg, `cat=${this.value}`)
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
            $('#cat-all').prop("checked", true);
        }   
    });

    $('input[id^=brand-]').change(function () {
        var filter = $('#filter-state').val();
        if (this.checked){
            if (!filter) {
                filter = `brd=${this.value}`
            }
            if (filter.includes("brd=")){
                var reg = /brd=([^&]*)/
                filter = filter.replace(reg, `brd=${this.value}`)
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
            $('#brand-all').prop("checked", true);
        }   
    });
});
    
    