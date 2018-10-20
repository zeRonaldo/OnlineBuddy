var gamesModel = require('../model/games');


exports.postCreateGame = (req,res) => {
  if(req.file){
    req.body.image = req.file.filename;
  }else {
    req.body.image = "";
  }
  var newGame = new gamesModel({
    'title' : req.body.gameTitle,
    'genre' : req.body.genre,
    'description' : req.body.gameDescription,
    'image' : req.body.image
  });
  console.log("teste");
  newGame.save();
  res.send({'success': true});
}

exports.getAllGames = (req, res) => {
  gamesModel.find(req.query, (err,games) =>{
  if(err){
    console.log(err);
  }else{
    res.send(games);
  }
});
}


exports.getGameByTitle = (req, res) => {
  var query = {genre : req.params.gameTitle}
  gamesModel.find(query, (err, game) =>{
  if(err){
    console.log(err);
  }else{
    res.send(games);
  }
});
}
