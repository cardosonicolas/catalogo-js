const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./database/db");

// importing router
const indexRoutes = require("./routes/index");
const prodRoutes = require("./routes/product");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/", indexRoutes);
app.use("/", prodRoutes);

// starting the server
app.listen(app.get("port"), () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  console.log(`Server on port ${app.get("port")}`);
});
