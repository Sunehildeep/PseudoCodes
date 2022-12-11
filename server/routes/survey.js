let express = require("express");
let router = express.Router();

let passport = require("passport");
let jwt = require('jsonwebtoken');
let surveyController = require("../controllers/survey");


function authorized(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        console.log(user);
        console.log(err);
        if (err || !user) return res.status(401).json({message: 'You are not authorized to perform this operation!'});
        req.user = user;
        next();
    })(req, res, next);
}

// GET Route for the Survey List page - READ OPERATION
router.get("/", surveyController.displayActiveSurveysPage);

/* Post create survey page. */
router.post("/create-survey", authorized, surveyController.processCreateSurveyPage);

router.post("/login", surveyController.loginUser);

router.get("/logout", surveyController.logoutUser);

// Register User
router.post("/register", surveyController.registerUser);

// update survey
router.post("/update-survey/:id", authorized, surveyController.processEditSurveyPage);

// read survey by id
router.get("/read-survey/:id",  surveyController.displayEditSurveyPage);

// read survey by author
router.get("/read-my-surveys/:author", authorized, surveyController.displayMySurveyPage);

// Delete Survey
router.delete("/delete-survey/:id", authorized, surveyController.performDeleteSurvey);

// Read My Responses
router.get("/read-my-responses/:id", surveyController.displayMyResponsePage);

// Read My Stats
router.get("/read-my-stats/:id", surveyController.displayMyStatPage);

// Save Responses
router.post("/survey_responses", surveyController.processCreateResponses);

module.exports = router;
