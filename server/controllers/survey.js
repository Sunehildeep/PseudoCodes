var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");

// connect to our Survey Model
let Survey = require("../models/survey");

//add survey content
module.exports.displayActiveSurveysPage = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(surveyList);
    }
  });
};

module.exports.processCreateSurveyPage = (req, res, next) => {
  let newSurvey = Survey({
    "author": req.body.author,
    "surveyName": req.body.surveyName,
    "startDate": req.body.startDate,
    "closeDate": req.body.closingDate,
    "questions": req.body.questions,
  });

  Survey.create(newSurvey, (err, Survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json(Survey);
    }
  });
};

module.exports.processEditSurveyPage = (req, res, next) =>{
  let id = req.params.id;

  let editedSurvey = Survey({
    "_id" : id,
    "author": req.body.author,
    "surveyName": req.body.surveyName,
    "startDate": req.body.startDate,
    "closeDate": req.body.closingDate,
    "questions": req.body.questions,
  });

  Survey.updateOne({_id: id}, editedSurvey,(err)=>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else{
      res.status(200).json({
        msg: data,
      });
    }
  });
}

//delete survey content
module.exports.performDeleteSurvey = (req, res, next) => {
  let id = req.params.id;

  Survey.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      return console.error(err);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
