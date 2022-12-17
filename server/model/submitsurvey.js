let mongoose = require('mongoose');

let submitsurveyModel = mongoose.Schema({
    title:String,
    answer:Array
},
{collection: 'submitsurvey'});

module.exports = mongoose.model('submitsurvey',submitsurveyModel);

