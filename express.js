//EXPRESS
var express = require("express");
//serveur qui utilise le module express
var app = express();
//utilisation module url
var url = require("url");
//utilisation module  queryString
var querystring = require("querystring");

//permet de déclarer une route
//A chaque app.get : une route
app.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send("<strong>Hello World</strong>");
});

app.get("/form.html", function(req, res) {
  //pas précisé, mais 200 par défaut
  res.setHeader("Content-Type", "text/html");
  res.send(
    //formulaire
    "<!DOCTYPE html>" +
      "" +
      "    " +
      "        <meta charset='utf-8'>" +
      "        <title>Mon formulaire</title>" +
      "    " +
      "    " +
      "     	<form action='/resultat.html' method='GET'>" +
      "           <input type='text' name='nom' placeholder='votre nom'>" +
      "           <input type='text' name='prenom' placeholder='votre prénom'>" +
      "           <button type='submit'>GO</button>" +
      "       </form>" +
      "    " +
      ""
  );
});

app.get("/resultat.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");

  var params = querystring.parse(url.parse(req.url).query);
  //verif clés
  if ("prenom" in params && "nom" in params) {
    //vérif valeurs
    if (params["prenom"] === "" || params["nom"] === "") {
      //envoi réponse
      res.send("Il faut remplir TOUT le formulaire");
    } else {
      //envoi réponse
      res.send(
        "Hey ! Vous vous appelez : " + params["prenom"] + " " + params["nom"]
      );
    }
  } else {
    //envoi réponse
    res.send("Données incorrectes");
  }
});

//si pas de route : on crée la réponse 404
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/html");
  res.status(404).send("404 : Y'a personne ici...");
  console.error("Une erreur 404 a été retournée");
});
//écoute du port 8080
app.listen(8080);
