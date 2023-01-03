const db = require("../../database/model/product");
const userDb = require("../../database/model/user");

module.exports = async (req) => {
  const { id } = req.params;
  var commentsList = await db.getCommentByProductId(id);
  var result = [];
  for (const value of commentsList) {
    var user = await userDb.getUserInfo(value.customer_id);
    result.push({
      comment: value.comment,
      email: user.email,
      avatar: user.user_avt,
      create_date: value.create_date,
    });
  }

  return result;
};
