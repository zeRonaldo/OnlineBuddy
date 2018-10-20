var express = require('express');
var router = express.Router();
var gamesController = require('../controllers/games');
var usersController = require('../controllers/users');
var usersModel = require('../model/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var multer = require('multer');
var fs = require('fs');

var multerConf ={
  storage : multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null,'./public/uploads')
    },
    filename:(req, file, cb)=>{
      var ext = file.mimetype.split('/')[1];
       cb(null, file.fieldname+'-'+Date.now() +'.'+ext);
     }
   }),
};

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Express' });
});
router.post('/user/new', usersController.postCreateUser);
router.get('/users', usersController.getUsers);
router.post('/user/login', passport.authenticate('local'),(req,res)=>{
  res.send({success: "true"});
  console.log(req.user);
});
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/games/new',multer(multerConf).single('imagem'),gamesController.postCreateGame);

router.get('/games',gamesController.getAllGames);














// TODO PASSAR PARA USERS.JS
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  usersModel.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username,password,done){
    usersModel.getUserByUsername(username, function(err, user){
      if(err)
        throw err;
      if(!user){
        return done(null, false,{message: 'Usuário anônimo'});
      }
      bcrypt.compare(password.trim(), user.password, function(err, isMatch) {
        if(err)
          return done(err);
        else if(isMatch){
          return done(null,user);
        }else {
          return done(null, false, { message: 'Incorrect username.' });
        }
      });
    });
  }));

module.exports = router;
