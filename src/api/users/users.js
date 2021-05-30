const express = require("express");
const router = express.Router();
const usersControllers = require("../../controllers/users");
const guard = require("../../helpers/guard");
const {
  createAccountLimiter,
  loginLimiter,
} = require("../../helpers/rate-limit");
// const { validateUpdateSubscriptionStatus } = require("../../validator/users");

router
  .post("/registration", createAccountLimiter, usersControllers.reg)
  .post("/login", loginLimiter, usersControllers.login)
  .post("/logout", guard, usersControllers.logout)
  .get("/current", guard, usersControllers.currentUser);

router.patch("/", guard, usersControllers.updateSubscriptionStatus);

module.exports = router;
