const express = require("express");
const router = express.Router();
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const User = require("../models/user");
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      keepSessionInfo: true,
    }),
    // Now we can use res.locals.returnTo to redirect the user after login
    (req, res) => {
      req.flash("success", "Welcome back!");
      const redirectUrl = res.locals.returnTo || "/campgrounds"; // update this line to use res.locals.returnTo now
      res.redirect(redirectUrl);
    }
  );

router.get("/logout", users.logout);

module.exports = router;
