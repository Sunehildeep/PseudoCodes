var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create the User Model Instance
let userModel = require("../models/user");
let User = userModel.User; //alias

module.exports.displayHomePage = (req, res, next) => {
    res.render("index", { title: "Welcome!" });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render("about", { title: "About" });
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is logged in
    if(!req.user)
    {
        res.render("auth/login",
        {
            title: "Login",
            messages: req.flash("loginMessage"),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect("/");
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate("local",
    (err, user, info) => {
        // server error?
        if(err) {
            return next(err);
        }
        // user login error?
        if(!user) {
            req.flash("loginMessage", "Authentication Error");
            return res.redirect("/login");
        }
        req.login(user, (err) => {
            // server error?
            if(err) {
                return next(err);
            }
            return res.redirect("/surveys/active-surveys");
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not logged in
    if(!req.user) {
        res.render("auth/register",
        {
            title: "Register",
            messages: req.flash("registerMessage"),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect("/");
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName,
    });
    console.log(newUser);
    User.register(newUser, req.body.password, (err) => {
        if(err) {
            console.log("Error");
            if(err.name == "UserExistsError") {
                req.flash(
                    "registerMessage",
                    "Registration Error: User Already Exists!"
                );
                console.log("Error: User Already Exists!");
            }
            return res.render("auth/register", {
                title: "Register",
                messages: req.flash("registerMessage"),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            // if there's no error, then registration successful
            // redirect the user and authenticate them 
            return passport.authenticate("local")(req, res, () => {
                res.redirect("/surveys/active-surveys");
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect("/");
    })
}

