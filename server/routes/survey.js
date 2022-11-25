let express = require("express");
let router = express.Router();

let passport = require("passport");

let surveyController = require("../controllers/survey");

// GET Route for the Survey List page - READ OPERATION
router.get("/", surveyController.displayActiveSurveysPage);

/* Post create survey page. */
router.post("/create-survey", passport.authenticate('jwt', {session: false}), surveyController.processCreateSurveyPage);

/* Post edit survey page. */
router.post("/edit/:id", passport.authenticate('jwt', {session: false}), surveyController.processEditSurveyPage);

router.post("/login", surveyController.loginUser);

router.get("/logout", surveyController.logoutUser);

// Register User
router.post("/register", surveyController.registerUser);

// update survey
router.put("/update-survey/:id", passport.authenticate('jwt', {session: false}), surveyController.updateSurvey);

// read survey by id
router.get("/read-survey/:id", passport.authenticate('jwt', {session: false}), surveyController.displayEditSurveyPage);

// Delete Survey
router.delete("/delete-survey/:id", passport.authenticate('jwt', {session: false}), surveyController.performDeleteSurvey);

module.exports = router;
