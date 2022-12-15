exports.loginStep = (req, res) => {
  const { error } = req.query;
  res.render("login", { error });
};
