const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");

router.post("/add", (req, res, next) => {
  Product.create({
    name: "Nombre",
    price: "500",
    img: "img",
  }).then((post) => {
    res.json(post);
  });
  res.redirect("/add");
});

module.exports = router;
