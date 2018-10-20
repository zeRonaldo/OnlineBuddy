var db = require('./../conf/connect_db')();
var Schema = require('mongoose').Schema;
var mongoose = require('mongoose');


var gameSchema = Schema({
  title : String,
  image : String,
  description : String,
  genre: String
});

var game = module.exports = mongoose.model('game', gameSchema);
