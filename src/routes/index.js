const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");

router.get("/", (req, res) => {
  Product.findAll().then((prods) => {
    res.render("index", { prods });
  });
});

module.exports = router;
