let express = require("express");
let router = express.Router();

let passport = require("passport");
let jwt = require('jsonwebtoken');
let surveyResponses = require("../controllers/survey_responses");
const surveyController = require("../controllers/survey");

function authorized(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        console.log(user);
        console.log(err);
        if (err || !user) return res.status(401).json({message: 'You are not authorized to perform this operation!'});
        req.user = user;
        next();
    })(req, res, next);
}
router.get("/read-my-surveys/:id", authorized, surveyResponses.displayMyResponsePage);
router.post("/survey_responses", authorized, surveyResponses.processCreateResponses);

module.exports = router;
