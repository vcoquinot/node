//CREATION SERVEUR

//Déclaration variable http
var http = require("http");
//Déclaration variable serveur
//Méthode createServer
//fonction de callback avec deux paramètres : question, réponse
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("Hello World");
  console.log("Vous avez un nouveau visiteur !");
});
//déclenche l'ouverture du serveur et son écoute
server.listen(8080);

//ouvrir navigateur
//taper localhost:8080
//à chaque fois deux requtes car a première est la recherche de la favicon
