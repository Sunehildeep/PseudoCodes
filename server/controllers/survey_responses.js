let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let survey_responses = require("../models/survey_responses");
let passport = require("passport");
let jwt = require('jsonwebtoken');
let DB = require('../config/db');
const Survey = require("../models/survey");

//update survey content
module.exports.processCreateResponses = (req, res, next) => {
    let newResponses = survey_responses({
        "surveyID": req.body.surveyID,
        "ans1": req.body.ans1,
        "ans2": req.body.ans2,
        "ans3": req.body.ans3,
        "ans4": req.body.ans4,
        "ans5": req.body.ans5
    });

    survey_responses.create(newResponses, (err, survey_responses) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.status(200).json({success: true, message: "Survey responses inserted."});
        }
    });
};

module.exports.displayMyResponsePage = (req, res, next) => {
    let id = req.params.surveyID;
    console.log(id);
    Survey.find( {surveyID: id} ,(err, myResponseList) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(myResponseList);
            res.status(200).json({data: myResponseList});
        }
    });
};
