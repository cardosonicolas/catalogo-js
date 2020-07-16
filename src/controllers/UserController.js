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
      res.redirect("/register");
    } else {
      await User.create({
        name: name,
        email: email,
        password: password,
      })
        .then(() => {
          req.flash("success_msg", "Te has registrado con exito");
          res.redirect("/login");
        })
        .catch((err) => {
          req.flash("error_msg", err.message);
          res.redirect("/register");
        });
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
