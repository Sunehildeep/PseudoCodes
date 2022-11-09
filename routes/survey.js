let express = require('express');
let router = express.Router();
let surveyController = require('../controllers/survey');
const indexController = require("../controllers");

// GET Route for the Survey List page - READ OPERATION
router.get("/active-surveys", surveyController.displayActiveSurveysPage);


/* GET create survey page. */
router.get("/create-survey", surveyController.displayCreateSurveyPage);


module.exports = router;