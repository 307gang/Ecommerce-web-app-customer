const model = require("../model/authModel");

module.exports = (req, res) => {
  try {
    const { t } = req.query || uuid.v4();
    const expiration =
      req.query.expire || parseInt(Date.now() / 1000) + 60 * 10; // Default expiration in 10 mins

    const signatureObj = model.getAuthenticationParameters(t, expiration);

    res.status(200).send(signatureObj);
  } catch (err) {
    console.error(
      "Error while responding to auth request:",
      JSON.stringify(err, undefined, 2)
    );
    res.status(500).send("Internal Server Error");
  }
};
