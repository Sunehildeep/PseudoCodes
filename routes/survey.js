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
router.get("/active-surveys", surveyController.displayActiveSurveysPage);

/* GET create survey page. */
router.get("/create-survey", requireAuth, surveyController.displayCreateSurveyPage);

/* Post create survey page. */
router.post("/create-survey", requireAuth, surveyController.processCreateSurveyPage);

/* GET edit survey page. */
router.get("/edit/:id", requireAuth, surveyController.displayEditSurveyPage);

/* Post edit survey page. */
router.post("/edit/:id", requireAuth, surveyController.processEditSurveyPage);

/* DELETE survey page. */
router.get("/delete/:id", requireAuth, surveyController.deleteSurvey);

module.exports = router;
