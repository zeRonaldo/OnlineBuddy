var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var usersModel = require('../model/users');
var async = require('async');
var moment = require('moment');


exports.postCreateUser = (req, res)=>{

  var newUser = new usersModel({
    'email' : req.body.email,
    'username': req.body.username,
    'password': req.body.password,
    'role' : req.body.role
  });
  usersModel.createUser(newUser, function(err,user){
    if(err)
      throw err;
    else
      res.render('index');
    });
}

exports.getUsers = (req, res) =>{

  usersModel.find(req.query,'username email games friends rating type' ,(err,users) =>{
  if(err){
    console.log(err);
  }else{
    res.send(users);
  }
});
}
