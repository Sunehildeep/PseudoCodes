let mongoose = require("mongoose");

let surveyModel = mongoose.Schema({
    author: String,
    surveyName: String,
    startDate: String,
    closeDate: String,
    questions: Array,
},
{
    collection: "survey-list"
});

module.exports = mongoose.model('Survey', surveyModel);