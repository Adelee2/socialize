var bcrypt = require('bcryptjs'),
    Q = require('q'),
    { uuid } = require('uuidv4'),
    User = require('../../model/users'); //config file contains all tokens and other private info
const UserInfo = require('../../model/userinfo');

//used in local-signup strategy
exports.localReg = function (name,email,password,dob,gender,location) {
  var deferred = Q.defer();
    //check if username is already assigned in our database
    User.findOne({'email' : email})
      .then(function (result) {
        if (null != result) {
          console.log("USER ALREADY EXISTS:", result.email);
          deferred.resolve(false); // username exists
        }
        else  {
          var hash = bcrypt.hashSync(password, 10);
          

          console.log("CREATING USER:", name);
          UserInfo.create({
            avatar:"https://firebasestorage.googleapis.com/v0/b/socializer-69de0.appspot.com/o/images%2Fnoimage.jpg?alt=media&token=ae4d6fc4-3a5e-4011-83cf-29225fb1ac78",
            location:location
          }).
          then(userinfo=>{
            var user = {
              name: name,
              email: email,
              password: hash,
              token: uuid(),
              userinfo:userinfo._id,
              dob:dob,
              gender:gender
            }
            User.create(user)
            .then(function () {

                deferred.resolve(user);
              
            }).catch(err2=>{
              console.log('user err: ',err2)
            })
          })
          .catch(err1=>{
                console.log('userinfo err: ',err1)
              })
          
        }
      });

  return deferred.promise;
};


//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (email, password) {
  var deferred = Q.defer();
    User.findOne({'email' : email})
      .then(function (result) {
        if (null == result) {
          console.log("USER NOT FOUND:", email);

          deferred.resolve(false);
        }
        else {
          var hash = result.password;

          console.log("FOUND USER: " + result.email);

          if (bcrypt.compareSync(password, hash)) {
            deferred.resolve(result);
          } else {
            console.log("AUTHENTICATION FAILED");
            deferred.resolve(false);
          }
        }
      });
  return deferred.promise;
}