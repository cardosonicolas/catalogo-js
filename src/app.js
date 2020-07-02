const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./database/db");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const bodyParser = require("body-parser");

/* ctrl + p = archivos
ctlr + shift + f = codigo */
require("./config/passport");

// importing router
const indexRoutes = require("./routes/index");
const prodRoutes = require("./routes/product");
const userRouter = require("./routes/user");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use("/", indexRoutes);
app.use("/", prodRoutes);
app.use("/", userRouter);

// starting the server
app.listen(app.get("port"), () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Conexión a DB establecida");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  console.log(`Server on port ${app.get("port")}`);
});
