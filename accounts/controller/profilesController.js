const Ajv = require("ajv");
const format = require("ajv-formats");

const db = require('../../database/model/usersDB')



exports.profileStep = (req, res) => {
  var {id, username} = req.user;
  (async () => {
    var userinfo = await db.getUserInfo(id);
    res.render("profile", {userinfo});
  })();
  
};