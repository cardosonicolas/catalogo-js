const express = require("express");
const router = express.Router();
const user = require("../controllers/UserController");

router.get("/register", user.renderRegister);

router.post("/register", user.register);

router.get("/login", user.renderLogin);

router.post("/login", user.login);

router.get("/logout", user.logout);

module.exports = router;
