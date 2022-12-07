$(document).ready(() => {
    $('#all-price').change(function () {
        if (this.checked)
            $('input[id^=price-]').prop("checked", false);
        $('#all-price').val(this.checked);
    })

    
    $('#all-cat').change(function () {
        if (this.checked)
            $('input[id^=cat-]').prop("checked", false);
        $('#all-cat').val(this.checked);
    })

    $('#all-brand').change(function () {
        if (this.checked)
            $('input[id^=brand-]').prop("checked", false);
        $('#all-price').val(this.checked);
    })

    $('input[id^=price-]').change(function () {
        if (this.checked)
            $('#all-price').prop("checked", false);
    });

    $('input[id^=cat-]').change(function () {
        if (this.checked)
            $('#all-cat').prop("checked", false);
    });

    $('input[id^=brand-]').change(function () {
        if (this.checked)
            $('#all-brand').prop("checked", false);
    });
});
    
    