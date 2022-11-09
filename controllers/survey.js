var express = require("express");
var router = express.Router();
let mongoose = require('mongoose');

// connect to our Survey Model
let Survey = require('../models/survey');

module.exports.displayActiveSurveysPage = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render("survey/active-surveys", { title: "Active Surveys", surveyList: surveyList});
        }
    });
}
