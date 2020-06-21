const userCtrl = {};
const User = require("../database/models/User");

userCtrl.renderRegister = (req, res) => {
  res.render("register");
};

module.exports = userCtrl;
