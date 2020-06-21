const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");

router.get("/", (req, res) => {
  Product.findAll().then((prods) => {
    res.render("index", { prods });
  });
});
router.get("/prod", (req, res) => {
  res.redirect("/");
});

module.exports = router;
