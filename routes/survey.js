let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Survey Model
let Survey = require('../public/models/survey');

// GET Route for the Survey List page - READ OPeration 
router.get('/', (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('survey', {title: 'Survey List', SurveyList: surveyList})            
        }
    });
});

module.exports = router;