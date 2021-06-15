const {localAuth,localReg} = require('./utils/auth')
const notification = require('../model/notification')
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var GoogleStrategy = require('passport-google');
var LocalStrategy = require('passport-local');

class Auth{
    constructor (){

        passport.serializeUser(function(user, done) {
            console.log("serializing " + user.username);
            done(null, user);
        });
        
        passport.deserializeUser(function(obj, done) {
            console.log("deserializing " + obj);
            done(null, obj);
        });
        
        // Use the LocalStrategy within Passport to login users.
        passport.use('local-signin', new LocalStrategy(
            {passReqToCallback : true}, //allows us to pass back the request to the callback
            function(req, username, password, done) {
            localAuth(username, password)
            .then(function (user) {
                if (user) {
                console.log("LOGGED IN AS: " + user.username);
                req.session.success = 'You are successfully logged in ' + user.username + '!';
                done(null, user);
                }
                if (!user) {
                console.log("COULD NOT LOG IN");
                req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
                done(null, user);
                }
            })
            .fail(function (err){
                console.log(err.body);
            });
            }
        ));
        
        // Use the LocalStrategy within Passport to Register/"signup" users.
        passport.use('local-signup', new LocalStrategy(
            {passReqToCallback : true}, //allows us to pass back the request to the callback
            function(req, username, password, done) {
            localReg(username, password)
            .then(function (user) {
                if (user) {
                console.log("REGISTERED: " + user.username);
                req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
                done(null, user);
                }
                if (!user) {
                console.log("COULD NOT REGISTER");
                req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
                done(null, user);
                }
            })
            .fail(function (err){
                console.log(err.body);
            });
            }
        ));
     

        // Use the LocalStrategy within Passport to login users.
        // passport.use('google-signin', new GoogleStrategy(
        //     {passReqToCallback : true}, //allows us to pass back the request to the callback
        //     function(req, username, password, done) {
        //     localAuth(username, password)
        //     .then(function (user) {
        //         if (user) {
        //         console.log("LOGGED IN AS: " + user.username);
        //         req.session.success = 'You are successfully logged in ' + user.username + '!';
        //         done(null, user);
        //         }
        //         if (!user) {
        //         console.log("COULD NOT LOG IN");
        //         req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        //         done(null, user);
        //         }
        //     })
        //     .fail(function (err){
        //         console.log(err.body);
        //     });
        //     }
        // ));
        
        // Use the LocalStrategy within Passport to Register/"signup" users.
        // passport.use('google-signup', new GoogleStrategy(
        //     {passReqToCallback : true}, //allows us to pass back the request to the callback
        //     function(req, username, password, done) {
        //     localReg(username, password)
        //     .then(function (user) {
        //         if (user) {
        //         console.log("REGISTERED: " + user.username);
        //         req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        //         done(null, user);
        //         }
        //         if (!user) {
        //         console.log("COULD NOT REGISTER");
        //         req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        //         done(null, user);
        //         }
        //     })
        //     .fail(function (err){
        //         console.log(err.body);
        //     });
        //     }
        // ));
        }
        login= function(req,res){
            res.render('index')
        }
        register= function(req,res){
            res.render('singup')
        }
        logout= function(req, res){
            var name = req.user.name;s
            console.log("LOGGIN OUT " + req.user.name)
            req.logout();
            res.redirect('/login',{});
            req.session.notice = "You have successfully been logged out " + name + "!";
          }

        // Simple route middleware to ensure user is authenticated.
        ensureAuthenticated = function(req, res, next) {
            if (req.isAuthenticated()) { return next(); }
            req.session.error = 'Please sign in!';
            res.redirect('/login');
        }
}

// Auth.prototype.authlogin=()=> {
//     passport.authenticate('local-signin', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//         }) 
// }





module.exports = Auth;