var order = $("#order-state").val();
var filter = $("#filter-state").val();
var total = Number($("#total-pages").val());
var page = Number($("#page").val());

function pagination(numPages) {
  $("#nav").empty();
  // $('#nav').append('<li class="page-item disabled"><span class="page-link">Previous</span></li>');
  for (i = 0; i < numPages; i++) {
    var pageNum = i + 1;
    $("#nav").append(
      '<li class="page-item"><a class="page-link" id="' +
        pageNum +
        '" href="#" rel="' +
        i +
        '">' +
        pageNum +
        "</a></li>"
    );
  }
  // $('#nav').append('<li class="page-item"><span class="page-link">Next</span></li>');
  $(`#nav #${page}`).addClass("active");
}

function updateQueryParam(queryString) {
  var url = new URL(window.location);
  var params = new URLSearchParams(queryString);
  url.search = params;
  window.history.pushState({}, "", url);
}

function getUrl(path, queryString) {
  var url = new URL(window.location);
  url.pathname = path;
  var params = new URLSearchParams(queryString);
  url.search = params;
  return url;
}

function updateProductList(template, data) {
  $("#products").empty();
  var context = { product_list: data.products };
  var html = template(context);
  $("#products").append(html);
  pagination(total);
}

$(document).ready(() => {
  Handlebars.registerHelper("multiply", function (a, b) {
    return a * b;
  });

  $.get("/js/generate.handlebars").then(async (src) => {
    var template = Handlebars.compile(src);
    var cur_page = `page=${page}`;

    // regex varible for query string
    pagination(total);
    var priceQuery = /p_s=([^&]*)&p_e=([^&]*)/;
    var catQuery = /cat=([^&]*)/;
    var brdQuery = /brd=([^&]*)/;
    var reg1 = /=([^&]*)/,
      reg2 = /[A-Za-z0-9]+/;
    //------------------------------------------------------------------------------
    //initialize filter
    var cat = filter.match(catQuery);
    if (cat) {
      var temp = cat[0].match(reg1);
      var val = temp[0].match(reg2);
      $(`#cat-${val[0]}`).prop("checked", true);
    } else {
      $(`#cat-all`).prop("checked", true);
    }

    var p_s = filter.match(priceQuery);
    var p_s_v = { 0: 1, 50: 2, 100: 3, 500: 4, 1000: 5 };
    if (p_s) {
      var temp = p_s[0].match(reg1);
      var val = temp[0].match(reg2);
      var index = val[0];
      $(`#price-${p_s_v[index]}`).prop("checked", true);
    } else {
      $(`#price-all`).prop("checked", true);
    }

    var brd = filter.match(brdQuery);
    if (brd) {
      var temp = brd[0].match(reg1);
      var val = temp[0].match(reg2);
      $(`#brand-${val[0]}`).prop("checked", true);
    } else {
      $(`#brand-all`).prop("checked", true);
    }
    //------------------------------------------------------------------------------
    //filter action
    $("input[id^=price-]").change(function () {
      var queryString = "";
      if (this.checked) {
        if ($(this).data("value") != "") {
          if (!filter) {
            filter = `p_s=${$(this).data("value").start}&p_e=${
              $(this).data("value").end
            }`;
          }
          if (filter.includes("p_s")) {
            filter = filter.replace(
              priceQuery,
              `p_s=${$(this).data("value").start}&p_e=${
                $(this).data("value").end
              }`
            );
          } else {
            filter =
              filter +
              `&p_s=${$(this).data("value").start}&p_e=${
                $(this).data("value").end
              }`;
          }
        } else {
          if (filter.includes("p_s")) {
            filter = filter.replace(priceQuery, "");
          }
        }
        $(".price-filter").prop("checked", false);
        $(this).prop("checked", true);
        var queryString = "";
      } else {
        $("#price-all").prop("checked", true);
        if (filter.includes("p_s")) {
          filter = filter.replace(priceQuery, "");
        }
      }
      page = 1;
      cur_page = `page=${page}`;
      $.getJSON(getUrl("/database/total/products", `${filter}`), (data) => {
        if (Number(data.total)) {
          total = Math.ceil(Number(data.total) / 6);
        } else total = 1;
      });
      $.getJSON(
        getUrl(
          "/database/products",
          `${filter}&${order}&range=6&start=${(page - 1) * 6}`
        ),
        (data) => {
          updateProductList(template, data);
        }
      );
      updateQueryParam(`${filter}&${order}&${cur_page}`);
    });

    $("input[id^=cat-]").change(function () {
      if (this.checked) {
        if (!filter) {
          filter = `cat=${this.value}`;
        }
        if (filter.includes("cat=")) {
          filter = filter.replace(catQuery, `cat=${this.value}`);
        } else {
          filter = filter + `&cat=${this.value}`;
        }
        $(".cat-filter").prop("checked", false);
        $(this).prop("checked", true);
      } else {
        $("#cat-all").prop("checked", true);
        if (filter.includes("cat=")) {
          filter = filter.replace(catQuery, "");
        }
      }
      page = 1;
      cur_page = `page=${page}`;
      $.getJSON(getUrl("/database/total/products", `${filter}`), (data) => {
        if (Number(data.total)) {
          total = Math.ceil(Number(data.total) / 6);
        } else total = 1;
      });
      $.getJSON(
        getUrl(
          "/database/products",
          `${filter}&${order}&range=6&start=${(page - 1) * 6}`
        ),
        (data) => {
          updateProductList(template, data);
        }
      );
      updateQueryParam(`${filter}&${order}&${cur_page}`);
    });

    $("input[id^=brand-]").change(function () {
      if (this.checked) {
        if (!filter) {
          filter = `brd=${this.value}`;
        }
        if (filter.includes("brd=")) {
          filter = filter.replace(brdQuery, `brd=${this.value}`);
        } else {
          filter = filter + `&brd=${this.value}`;
        }
        $(".brand-filter").prop("checked", false);
        $(this).prop("checked", true);
      } else {
        $("#brand-all").prop("checked", true);
        if (filter.includes("brd=")) {
          filter = filter.replace(brdQuery, "");
        }
      }
      page = 1;
      cur_page = `page=${page}`;
      $.getJSON(getUrl("/database/total/products", `${filter}`), (data) => {
        if (Number(data.total)) {
          total = Math.ceil(Number(data.total) / 6);
        } else total = 1;
      });
      $.getJSON(
        getUrl(
          "/database/products",
          `${filter}&${order}&range=6&start=${(page - 1) * 6}`
        ),
        (data) => {
          updateProductList(template, data);
        }
      );
      updateQueryParam(`${filter}&${order}&${cur_page}`);
    });
    //------------------------------------------------------------------------------
    //order action
    $("#sorted").change(function () {
      $("#products").empty();
      order = this.value;
      page = 1;
      cur_page = `page=${page}`;
      $.getJSON(
        getUrl(
          "/database/products",
          `${filter}&${order}&range=6&start=${(page - 1) * 6}`
        ),
        (data) => {
          updateProductList(template, data);
        }
      );
      updateQueryParam(`${filter}&${order}&${cur_page}`);
    });
    //------------------------------------------------------------------------------
    //pagination action
    $("#nav").on("click", "a", function (event) {
      event.preventDefault();
      //pagination ui modified
      $("html, body").animate({ scrollTop: 0 }, "fast");
      $("#nav a").removeClass("active");
      $(this).addClass("active");
      //update new product list
      page = Number($(this).attr("id"));
      cur_page = `page=${page}`;
      $("#list #item").animate({ opacity: 0 }, 300); //hide item
      $.getJSON(
        getUrl(
          "/database/products",
          `${filter}&${order}&range=6&start=${(page - 1) * 6}`
        ),
        (data) => {
          updateProductList(template, data);
        }
      );
      updateQueryParam(`${filter}&${order}&${cur_page}`);
      $("#list #item").animate({ opacity: 1 }, 300); //show item
    });
    //------------------------------------------------------------------------------
  });
});
