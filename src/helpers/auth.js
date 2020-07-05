const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No estas autorizado.");
  res.redirect("/login");
};

helpers.redirectIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("error_msg", `Ya estas logeado ${req.user.name}`);
    res.redirect("/add");
  }
  next();
};

module.exports = helpers;
