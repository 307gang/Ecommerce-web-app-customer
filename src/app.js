const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
let hbs = require("hbs");
let session = require("express-session");

const indexRouter = require("./index/routes/indexRoute");

const accountRouter = require("./accounts/routes/accountsRoute");
const productRouter = require("./product/routes/productRoute");
const infoRouter = require("./information/routes/info");
const allProductRouter = require("./all-product/routes/index");
const productDatabase = require("./database/route/productsRoute");
const categoryDatabase = require("./database/route/categoriesRoute");
const brandDatabase = require("./database/route/brandsRoute");
const totalDatabase = require("./database/route/totalRoute");
const passport = require("./accounts/model/authenticatePassport");

const app = express();

let views = [
  path.join(__dirname, "/public/asset"),
  path.join(__dirname, "/index/view"),
  path.join(__dirname, "/error"),
  path.join(__dirname, "/accounts/view"),
  path.join(__dirname, "/product/view"),
  path.join(__dirname, "/information/view"),
  path.join(__dirname, "/all-product/view"),
];

hbs.registerHelper("multiply", function (a, b) {
  return a * b;
});

let blocks = {};

hbs.registerHelper("extend", function (name, context) {
  let block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this));
});

hbs.registerHelper("block", function (name) {
  let val = (blocks[name] || []).join("\n");
  blocks[name] = [];
  return val;
});

hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.set("views", views);
app.set("view engine", "hbs");

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/product", productRouter);
app.use("/info", infoRouter);
app.use("/all-product", allProductRouter);
app.use("/database/products", productDatabase);
app.use("/database/categories", categoryDatabase);
app.use("/database/brands", brandDatabase);
app.use("/database/total", totalDatabase);

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
