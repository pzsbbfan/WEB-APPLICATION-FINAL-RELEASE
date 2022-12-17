let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let survey = require('../model/survey');
let SurveyController = require('../controller/survey');

/* GET surveys listing. */
router.get('/',SurveyController.displaySurveyList);

router.post('/',SurveyController.addNewSurvey);

router.get('/submitted',SurveyController.displaySubmittedSurveyList);

router.post('/submitted',SurveyController.SubmitSurvey);

router.get('/delete/:id', SurveyController.performDelete);

router.post('/edit/:id',SurveyController.processEditPage);

module.exports = router;
