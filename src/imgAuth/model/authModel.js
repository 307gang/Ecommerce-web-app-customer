const Imagekit = require("imagekit");
require("dotenv").config();

const image = new Imagekit({
  publicKey: process.env.PUB_KEY,
  privateKey: process.env.PRI_KEY,
  urlEndpoint: process.env.URL_END,
});

module.exports = image;
