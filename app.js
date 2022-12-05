const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./index/route/indexRoute");
const accountRouter = require('./accounts/route/accountsRoute');
const productRouter = require('./product/route/productRoute');

const app = express();

var views = ['./public/asset', './index/view', './error', './accounts/view', './product/view'];

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
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); });
module.exports = app;
