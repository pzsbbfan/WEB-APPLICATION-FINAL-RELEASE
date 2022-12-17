


// creating express reference
let express = require('express');

// creating reference of Router
let router = express.Router();

// Creating a reference object of mongoose
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../model/survey');
let submitsurvey = require('../model/submitsurvey');


// create a reference to the survey submit model

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // Get current day
            res.json(surveyList);      
        }
    });
}

module.exports.displaySubmittedSurveyList=(req,res,next) => {
    submitsurvey.find((err,submittedList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(submittedList);
        }
    })
}

module.exports.SubmitSurvey = (req,res,next)=>{
    let newSubmit = new submitsurvey({
        "title":req.body.title,
        "answer":req.body.answer
    });
    submitsurvey.create(newSubmit, (err,submitsurvey)=>{
        if (err){
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success:true, msg:'Successfully Submit Survey'})
        }
    })
}

module.exports.addNewSurvey = (req,res,next)=>{
    let newSurvey = Survey({
        "title":req.body.title,
        "type":req.body.type,
        "startdate":req.body.startdate,
        "enddate":req.body.enddate,
        "username":req.body.username,
        "question":req.body.question
    });
    Survey.create(newSurvey, (err,Survey)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.json({success:true, msg:'Successfully Added New Survey'});
        }
    })

}

module.exports.performDelete = (req,res,next)=>{
    let id = req.params.id;



    Survey.deleteOne({_id:id},(err)=>{
        if (err){
            console.log(err);
            res.end;
        }
        else{
         
            res.json({success:true,msg:'Successfully Deleted Book'});
        }
    });
}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id;

    let updatedSurvey = Survey({
        "_id":id,
        "title":req.body.title,
        "type":req.body.type,
        "startdate":req.body.startdate,
        "enddate":req.body.enddate,
        "username":req.body.username,
        "question":req.body.question
    });

    Survey.updateOne({_id:id}, updatedSurvey,(err) =>{
        if  (err){
            console.log(err);
            res.end;
        }
        else{
          
            res.json({success:true, msg:'Successfully Edited Survey', survey: updatedSurvey});
        }
    });
}


