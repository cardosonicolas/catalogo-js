const express = require("express");
const router = express.Router();
const product = require("../controllers/ProductController");
const upload = require("../libs/storage");

router.get("/add", product.renderAllprod);

router.post("/add", upload, product.createProd);

router.get("/prod/:id", product.findByPK);

router.get("/edit/:id", product.findByPK2);

router.post("/update/:id", upload, product.updateProd);

router.get("/delete/:id", product.deleteProd);

module.exports = router;
