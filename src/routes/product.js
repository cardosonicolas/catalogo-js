const express = require("express");
const router = express.Router();
const product = require("../controllers/ProductController");
const upload = require("../libs/storage");
const { isAuthenticated } = require("../helpers/auth");
const productCtrl = require("../controllers/ProductController");

router.get("/", product.renderAllprod);

router.get("/add", isAuthenticated, product.renderAllprod);

router.post("/add", upload, product.createProd);

router.get("/prod/:id", product.findByPK);

router.get("/edit/:id", isAuthenticated, product.findByPK);

router.post("/update/:id", isAuthenticated, upload, product.updateProd);

router.get("/delete/:id", isAuthenticated, product.deleteProd);

router.get("/enable/:id", isAuthenticated, product.stateChange);

module.exports = router;
