let mongoose = require("mongoose");


let surveyResponsesModel = mongoose.Schema({
    surveyID: String,
    ans1: String,
    ans2: String,
    ans3: String,
    ans4: String,
    ans5: String,
    participant: String,
},
    {
    collection: "response-list"

});

module.exports = mongoose.model('Responses', surveyResponsesModel);
