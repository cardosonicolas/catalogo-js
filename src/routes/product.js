const express = require("express");
const router = express.Router();
const cloudinary = require("../libs/cloudinary");
const Product = require("../database/models/Product");
const upload = require("../libs/storage");

router.get("/prod/add", (req, res) => {
  Product.findAll().then((prods) => {
    res.render("productos", { prods });
  });
});

router.post("/prod/add", upload, async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "catalogo_js",
  });
  console.log(result);
  await Product.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: result.secure_url,
    publicId: result.public_id,
  });
  res.redirect("/prod/add");
});

router.get("/prod/:id", (req, res) => {
  Product.findByPk(req.params.id).then((prod) => {
    res.render("card", { prod });
  });
});

router.get("/edit/:id", (req, res) => {
  Product.findByPk(req.params.id).then((prod) => {
    res.render("edit", { prod });
  });
});

//UPDATE
router.post("/update/:id", upload, async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "catalogo_js",
  });
  Product.update(
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.redirect("/prod/add");
});

//DELETE
router.get("/delete/:id", (req, res) => {
  Product.findByPk(req.params.id)
    .then((prod) => {
      cloudinary.v2.uploader.destroy(prod.publicId), prod.destroy();
    })
    .then((result) => {
      res.render("productos", { result });
      res.redirect("/prod/add");
    });
  /* await Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.render("productos", { result });
  }); */
});

module.exports = router;
