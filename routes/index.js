var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Welcome!" });
});

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("index", { title: "Welcome!" });
});

/* GET about page. */
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About" });
});

/* GET active surveys page. */
router.get("/active-surveys", function (req, res, next) {
  res.render("active-surveys", { title: "Active Surveys" });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

/* GET sign up page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Sign Up" });
});

module.exports = router;
