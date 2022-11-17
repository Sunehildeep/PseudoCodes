let express = require("express");
let router = express.Router();

let passport = require("passport");

let surveyController = require("../controllers/survey");

// function for guard purposes
function requireAuth(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
}

// GET Route for the Survey List page - READ OPERATION
router.get("/", surveyController.displayActiveSurveysPage);

/* Post create survey page. */
router.post("/create-survey", requireAuth, surveyController.processCreateSurveyPage);

/* Post edit survey page. */
router.post("/edit/:id", requireAuth, surveyController.processEditSurveyPage);

router.delete("/delete-survey/:id", requireAuth, surveyController.performDeleteSurvey);

module.exports = router;
