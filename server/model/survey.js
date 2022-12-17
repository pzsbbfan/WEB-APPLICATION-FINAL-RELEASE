let mongoose = require('mongoose');

let surveyModel = mongoose.Schema({
    title:String,
    type:String,
    startdate:String,
    enddate:String,
    username:String,
    question:Array
},
{collection: 'surveys'});

module.exports = mongoose.model('Survey',surveyModel);

