var express = require("express");
var router = express.Router();
var indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);

/* GET home page. */
router.get("/home", indexController.displayHomePage);

/* GET about page. */
router.get("/about", indexController.displayAboutPage);

/* GET active surveys page. */
router.get("/active-surveys", indexController.displayActiveSurveysPage);

/* GET create survey page. */
router.get("/create-survey", function (req, res, next) {
  res.render("create-survey", { title: "Create a Survey" });
});

/* GET login page. */
router.get("/login", indexController.displayLoginPage);

/* GET sign up page. */
router.get("/register", indexController.displayRegisterPage);

module.exports = router;
