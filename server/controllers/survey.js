var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");

// connect to our Survey Model
let Survey = require("../models/survey");
let passport = require("passport");
let jwt = require('jsonwebtoken');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;
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


module.exports.loginUser = (req, res, next) => {
  passport.authenticate('local',
      (err, user, info) => {
        // Server Error
        if(err)
        {
          return next(err);
        }
        // Details error
        if(!user)
        {
          return res.status(404).json({success: false, message: 'The username or password is incorrect!'});
        }
        req.login(user, (err) => {
          // Server Error
          if(err)
          {
            return next(err);
          }

          const payload =
          {
            id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email
          }

          console.log(payload);

          const authToken = jwt.sign(payload, DB.Secret, {
            expiresIn: 604800 // 1 week
          });

          return res.json({success: true, message: 'User Logged in Successfully!', user: {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email
            }, token: authToken});
        });
      })(req, res, next);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      else {
        res.status(200).json({
            message: "User Logged out Successfully!",
        });
      }
    });
}

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


// read survey by id
module.exports.displayEditSurveyPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, surveyToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(surveyToEdit);
      res.json({data: surveyToEdit});
    }
  });
};

module.exports.displayMySurveyPage = (req, res, next) => {
  let author = req.params.author;
  console.log(author);
  Survey.find( {author: author} ,(err, mySurveyList) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(mySurveyList);
      res.status(200).json({data: mySurveyList});
    }
  });
};


//update survey content
module.exports.processEditSurveyPage = (req, res, next) => {
  let id = req.params.id;
  let data = req.body.data;
  
  let updatedSurvey = Survey({
    _id: id,
    "author": data.author,
    "surveyName": data.surveyName,
    "startDate": data.startDate,
    "closeDate": data.closeDate,
    "questions": data.questions,
  });

  // Update the Survey By ID
  Survey.updateOne({_id: id}, updatedSurvey, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        message: "An error occured while trying to update the survey.",
      });
    } else {
      console.log("Survey Updated Successfully!");
      res.json({success: true, message: 'The survey was updated successfully!'});
    }
  });
};


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

//register user
module.exports.registerUser = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
});
  
  User.register(newUser, req.body.password, (err) => {
    if(err)
    {
      console.log("Error: Inserting New User");
      if(err.name == "UserExistsError")
      {
        console.log("Registration Error: User Already Exists!");
      }
      return res.status(404).json({success: false, message: 'Registration Error: User Already Exists!'});
    }
    else
    {
      // if no error exists, then registration is successful

      // redirect the user
      return res.json({success: true, message: 'User Registered Successfully!'});
    }
  });



}
