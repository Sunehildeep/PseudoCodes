var express = require("express");
var router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render("index", { title: "Welcome!" });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render("about", { title: "About" });
}

module.exports.displayActiveSurveysPage = (req, res, next) => {
    res.render("active-surveys", { title: "Active Surveys" });
}

module.exports.displayLoginPage = (req, res, next) => {
    res.render("login", { title: "Login" });
}

module.exports.displayRegisterPage = (req, res, next) => {
    res.render("register", { title: "Sign Up" });
}

module.exports.processLoginPage = (req, res, next) => {
    res.redirect("/home");
}

module.exports.displayCreateSurveyPage = (req, res, next) => {
    res.render("create-survey", { title: "Create a Survey" });
}