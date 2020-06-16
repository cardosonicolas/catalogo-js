const express = require("express");
const router = express.Router();
const upload = require("../libs/storage");
const Product = require("../database/models/Product");

router.get("/prod/add", (req, res) => {
  Product.findAll().then((prods) => {
    res.render("edit", { prods });
  });
});

router.post("/prod/add", upload, async (req, res) => {
  await Product.create(req.body);
  res.redirect("/prod/add");
});

router.get("/prod/:id", (req, res) => {
  Product.findByPk(req.params.id).then((prod) => {
    res.render("card", { prod });
  });
});

//UPDATE
router.get("/update/:id", (req, res) => {
  Task.update(
    {
      title: req.body.title,
      price: req.body.price,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((result) => {
    res.json(result);
  });
});

router.get("/delete/:id", async (req, res) => {
  await Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.render("edit", { result });
  });
  res.redirect("/prod/add");
});

/*
//UPDATE
router.patch("/update/:id", (req, res) => {
  Task.update(
    {
      title: req.body.title,
      price: req.body.price,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((result) => {
    res.json(result);
  });
});

//DELETE
router.delete("/delete/:id", (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.json(result);
    res.render("edit", { result });
  });
  res.redirect("/add");
});*/

module.exports = router;
