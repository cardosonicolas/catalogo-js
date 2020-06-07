const express = require("express");
const router = express.Router();
const upload = require("../libs/storage");
const Task = require("../database/models/Task");

router.get("/add", (req, res) => {
  Task.findAll().then((prods) => {
    return res.render("edit", { prods });
  });
});

//Create
router.post("/add", upload, (req, res) => {
  Task.create({
    title: req.body.title,
    price: req.body.price,
    img: null,
  }).then((post) => {
    res.json(post);
  });
});

//READ
router.get("/:id", (req, res) => {
  Task.findByPk(req.params.id).then((post) => {
    res.json(post);
  });
});

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
});
module.exports = router;
