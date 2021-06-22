const {localAuth,localReg} = require('./utils/auth')
const notification = require('../model/notification')
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var GoogleStrategy = require('passport-google');
var LocalStrategy = require('passport-local').Strategy;
const User = require('../model/users');

class Auth{
    constructor (){

        passport.serializeUser(function(user, done) {
            console.log("serializing " + user.name);
            done(null, user);
          });
          
          passport.deserializeUser(function(obj, done) {
            console.log("deserializing " + obj);
            done(null, obj);
          });
          
          // Use the LocalStrategy within Passport to login users.
          passport.use('local-signin', new LocalStrategy(
            {
                  passReqToCallback: true
              }, //allows us to pass back the request to the callback
            
            function(req, username, password, done) {
                // console.log("username",username)
                // console.log('password',password)
                localAuth(username, password)
                .then(function (user) {
                    // console.log("user",user)
                    if (user) {
                        console.log("LOGGED IN AS: " + user.email);
                        req.session.success = 'You are successfully logged in ' + user.email + '!';
                        
                        done(null, user, {message: 'Successfully'});
                    }
                    console.log("COULD NOT LOG IN");
                    req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
                    
                    done(null, user, {message: 'Incorrect Username/Email'});
                })
                .fail(function (err){
                    console.log(err.body);
                });
            }
          ));
        }
        login= function(req,res){
        
            res.render('index',{user:''})
        }
        register= function(req,res){
            res.render('singup')
        }
        sessionregister = function(req,res){
            let inputs = req.body;
            if(!inputs.name || !inputs.email || !inputs.password ){
                throw new Error("fill in all required fields");
            }
            
            localReg(inputs.name,inputs.email,inputs.password,inputs.location).then(user=>{
                console.log("user",user)
                    if (user) {
                        console.log("LOGGED IN AS: " + user.email);

                        return res.json({status:true,message: 'Registration Successful'});
                    }
                    console.log("COULD NOT REGISTER");

                    return res.json({status:false, message: 'Incorrect Username/Email'});
                })
                .fail(function (err){
                    console.log(err.body);
                });
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

module.exports = Auth;