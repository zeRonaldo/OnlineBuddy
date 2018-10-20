var db = require('./../conf/connect_db')();
var Schema = require('mongoose').Schema;
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var userSchema ={
  email: String,
  username:{
  type: String,
  index: true
  },
  password: String,
  role: String,
  games:[String],
  friends:[String],
  rating: Number
}
var user = module.exports = mongoose.model('user', userSchema);

module.exports.createUser = function(newUser, next){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(next);
    });
  });
}

module.exports.comparePassword = function(password, hash, next){

  bcrypt.compare(password, hash, function(err, isMatch) {
    if(err)
      throw err;
      console.log(hash);
      next(null, isMatch);
  });
}

function newUserSchema(userData) {
  return new user({
    'username': userData.username,
    'password': userData.password,
    'role' : userData.role
  });
}

function newUser(user) {
  return new Promise((accept, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        newUserSchema(user)
          .save()
          .then(accept)
          .catch(reject);
      });
    });
  });
}

// module.exports.createDefaultUserIfDoesntExist = function() {
//
//     user.count()
//     .then(count => {
//       if(count === 0) {
//         console.log('There\'s no registered users. Creating a default admin user...');
//         newUser({
//           'username': firstUserData.username,
//           'password': firstUserData.password,
//           'role': firstUserData.role
//         })
//         .then(created => {
//           console.log(`The user ${created.username} was successfully created!`);
//         })
//         .catch(err => {
//           console.log('An error ocurred: ', err);
//         });
//       }
//     })
//     .catch(err => {
//       console.log('An error ocurred: ', err);
//     });
// }
