var express = require("express");
var router = express.Router();
var indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);

/* GET home page. */
router.get("/home", indexController.displayHomePage);

/* GET about page. */
router.get("/about", indexController.displayAboutPage);

/* GET login page. */
router.get("/login", indexController.displayLoginPage);

/* POST route for processing the login page */
router.post("/login", indexController.processLoginPage);

/* GET sign up page. */
router.get("/register", indexController.displayRegisterPage);

/* POST route for processing the sign up page */
router.post("/register", indexController.processRegisterPage);

/* GET to perform user logout */
router.get("/logout", indexController.performLogout);

module.exports = router;
