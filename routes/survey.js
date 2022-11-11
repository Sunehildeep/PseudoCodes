let express = require("express");
let router = express.Router();
let surveyController = require("../controllers/survey");

// GET Route for the Survey List page - READ OPERATION
router.get("/active-surveys", surveyController.displayActiveSurveysPage);

/* GET create survey page. */
router.get("/create-survey", surveyController.displayCreateSurveyPage);

/* Post create survey page. */
router.post("/create-survey", surveyController.processCreateSurveyPage);

/* GET edit survey page. */
router.get("/edit/:id", surveyController.displayEditSurveyPage);

/* Post edit survey page. */
router.post("/edit/:id", surveyController.processEditSurveyPage);

/* DELETE survey page. */
router.get("/delete/:id", surveyController.deleteSurvey);

module.exports = router;
