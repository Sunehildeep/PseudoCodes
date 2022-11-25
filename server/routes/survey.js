let express = require("express");
let router = express.Router();

let passport = require("passport");

let surveyController = require("../controllers/survey");

// function for guard purposes
function requireAuth(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.status(403).send("Unauthorized");
    }
    next();
}

// GET Route for the Survey List page - READ OPERATION
router.get("/", surveyController.displayActiveSurveysPage);

/* Post create survey page. */
router.post("/create-survey", requireAuth, surveyController.processCreateSurveyPage);

/* Post edit survey page. */
router.post("/edit/:id", requireAuth, surveyController.processEditSurveyPage);

router.post("/login", surveyController.loginUser);

router.get("/logout", surveyController.logoutUser);

// Register User
router.post("/register", surveyController.registerUser);

// update survey
router.put("/update-survey/:id", requireAuth, surveyController.updateSurvey);

// read survey by id
router.get("/read-survey/:id", requireAuth, surveyController.displayEditSurveyPage);

// Delete Survey
router.delete("/delete-survey/:id", requireAuth, surveyController.performDeleteSurvey);

module.exports = router;
