const express = require("express");
const router = express.Router();
const user = require("../controllers/UserController");

router.get("/register", user.renderRegister);

router.post("/register", user.register);

module.exports = router;

/* if ((await User.findAll()).length < 1) {
  await User.create(req.body);
} else {
  console.log("Tomatela");
} */
