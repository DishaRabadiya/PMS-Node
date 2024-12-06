const {
  userLoginController,
  userRegistrationController,
} = require("./products.controller");

const router = require("express").Router();
router.post("/userregistration", userRegistrationController);
router.post("/userlogin", userLoginController);
module.exports = router;
