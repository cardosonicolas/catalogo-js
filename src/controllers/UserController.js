const userCtrl = {};
const User = require("../database/models/User");
const bcrypt = require("bcryptjs");

userCtrl.renderRegister = (req, res) => {
  res.render("register");
};

userCtrl.register = async (req, res) => {
  if ((await User.findAll()).length < 1) {
    const salt = await bcrypt.genSalt(10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    });
    res.redirect("/");
  } else {
    res.redirect("/");
  }
};

module.exports = userCtrl;
