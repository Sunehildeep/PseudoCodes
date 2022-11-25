let express = require("express");
let router = express.Router();

let passport = require("passport");
let jwt = require('jsonwebtoken');
let surveyController = require("../controllers/survey");


function authorized(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        if (err || !user) return res.status(401).json({message: 'You are not authorized to perform this operation!'});
        req.user = user;
        next();
    })(req, res, next);
}

// GET Route for the Survey List page - READ OPERATION
router.get("/", surveyController.displayActiveSurveysPage);

/* Post create survey page. */
router.post("/create-survey", authorized, surveyController.processCreateSurveyPage);

/* Post edit survey page. */
router.post("/edit/:id", authorized, surveyController.processEditSurveyPage);

router.post("/login", surveyController.loginUser);

router.get("/logout", surveyController.logoutUser);

// Register User
router.post("/register", surveyController.registerUser);

// update survey
router.put("/update-survey/:id", authorized, surveyController.updateSurvey);

// read survey by id
router.get("/read-survey/:id", authorized, surveyController.displayEditSurveyPage);

// Delete Survey
router.delete("/delete-survey/:id", authorized, surveyController.performDeleteSurvey);

module.exports = router;
