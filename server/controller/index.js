// create express reference 
let express = require('express');

// create router reference 
let router = express.Router();

// create mongoose reference 
let mongoose = require('mongoose');

// create passport reference 
let passport = require('passport');

// define user model
let userModel = require('../model/user');

// define survey model
let Survey = require('../model/survey');

// kind of alias creation
let User = userModel.User;
let jwt = require('jsonwebtoken');
let DB = require('../config/db');


//Home page rendering with passing different values
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', userId: req.user ? req.user.username : '' });
}


//Login page rendering with passing different values
module.exports.displayLoginPage = (req, res, next) => {
    // check if user login already
    if (!req.user) {
        res.render('auth/login',
            {
                title: "Login",
                messages: req.flash('loginMessage'),
                userId: req.user ? req.user.username : ''
            })
    }
    else {
        // redirecting
        return res.redirect('/');
    }
}

//When user will hit Submit of login page, this will be invoked

module.exports.processLoginPage = (req, res, next) => {
    console.log("inside processLoginPage");
    passport.authenticate('local',
        (err, user, info) => {
            // server error
            if (err) {
                return next(err);
            }
            // user login error
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                const payload = 
                {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
    
                const authToken = jwt.sign(payload, DB.Secret, {
                    expiresIn: 604800 // 1 week
                });
                return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }, token: authToken});
            });
        })(req, res, next);

}

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/register',
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                userId: req.user ? req.user.username : ''
            })
    }
    else {
        return res.redirect('/');
    }
}


module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log("Error: User Already Exists!");
            }
            return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    userId: req.user ? req.user.username : ''
                });
        }
        else
         {
            return res.json({success: true, msg: 'User Registered Successfully!'});
         }
    });
}


module.exports.performLogout = (req, res, next) => {
    req.logout(next);
    res.json({success:true,msg:'User Successfully logged out!'});
}

//Display 'MyPage'

module.exports.displayMyPagePage = (req, res, next) => {

    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        }
        else {
            // Get current day
            let currentDate = new Date()
            res.render('auth/mypage',
                {
                    title: 'My Surveys',
                    SurveyList: surveyList,
                    userId: req.user ? req.user.username : '',
                    today: currentDate
                });
        }
    });
}





