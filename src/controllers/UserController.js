const userCtrl = {};
const User = require("../database/models/User");
const passport = require("passport");

userCtrl.renderRegister = (req, res) => {
  res.render("register");
};

userCtrl.register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  if ((await User.findAll()).length < 10) {
    if (password != confirm_password) {
      req.flash("error_msg", "Las password no coinciden.");
    } else {
      const userEmail = User.findOne({ where: { email: email } });
      if (!userEmail) {
        req.flash("error_msg", "El email ya esta en uso.");
      } else {
        await User.create({
          name: name,
          email: email,
          password: password,
        });
        res.redirect("/login");
      }
    }
  } else {
    req.flash("error_msg", "Ya no tienes permiso para registrarte");
  }
};

userCtrl.renderLogin = (req, res) => {
  res.render("login");
};

userCtrl.login = passport.authenticate("local", {
  successRedirect: "/add",
  failureRedirect: "/login",
  failureFlash: true,
});

userCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Te has deslogeado.");
  res.redirect("/login");
};

module.exports = userCtrl;
