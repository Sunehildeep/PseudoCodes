let express = require('express');
let router = express.Router();
let surveyController = require('../controllers/survey');

// GET Route for the Survey List page - READ OPERATION
router.get("/active-surveys", surveyController.displayActiveSurveysPage);

module.exports = router;