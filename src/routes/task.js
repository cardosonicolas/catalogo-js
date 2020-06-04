const express = require("express");
const router = express.Router();
const Task = require("../database/models/Task");

//Create
router.route('/add')
  .get(function (req, res, next) {
    res.render("edit");
  })
  .post(function (req, res, next) {
    console.log(JSON.stringify(req.body));
    Task.create({
      title: req.body.title,
      price: req.body.price
    })
    res.redirect("/add");
  })

module.exports = router;