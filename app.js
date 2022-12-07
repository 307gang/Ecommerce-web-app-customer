const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var hbs = require('hbs');

const indexRouter = require("./index/routes/indexRoute");
<<<<<<< HEAD
=======

>>>>>>> main
const accountRouter = require('./accounts/routes/accountsRoute');
const productRouter = require('./product/routes/productRoute');
const infoRouter = require('./information/routes/info');
const allProductRouter = require('./all-product/routes/index');
const database = require('./database/route/productsRoute');
<<<<<<< HEAD
=======
const filterRouter = require("./filter/routes/filterRoute");
>>>>>>> main

const app = express();

var views = [
  "./public/asset",
  "./index/view",
  "./error",
  "./accounts/view",
  "./product/view",
  "./information/view",
  "./all-product/view",
  "./filter/view",
];

hbs.registerHelper('multiply', function (a, b) { return a * b; });

app.set("views", views);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/", indexRouter);
app.use('/account', accountRouter);
app.use('/product', productRouter);
app.use('/info', infoRouter);
app.use('/all-product', allProductRouter);
app.use('/database/products', database);
<<<<<<< HEAD

=======
app.use("/filter", filterRouter);
>>>>>>> main


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
