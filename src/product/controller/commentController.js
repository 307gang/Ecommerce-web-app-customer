let comments_db = require("../model/getCommentByProductIdAndUserId");
let db = require("../../database/model/product");
let createError = require("http-errors");

module.exports = (req, res, next) => {
  (async () => {
    const comments = await comments_db(req);
    if (!comments) next(createError(404));
    res.render("", { comments });
  })();
};
