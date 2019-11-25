//////////////////////////////////////////////////////////
//APPLI
//////////////////////////////////////////////////////////
var express = require("express");
var app = express();
var ejs = require("ejs");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

app.get("/:utilisateur/creation.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  //rendre notre formulaire
  res.render("creation.ejs", { utilisateur: req.params.utilisateur });
});

app.get("/:utilisateur/resultat.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  //données envoyées par le formulaire
  var params = querystring.parse(url.parse(req.url).query);

  if ("question" in params && "reponse" in params) {
    if (params["question"] === "" || params["reponse"] === "") {
      res.send("Il faut remplir TOUT le formulaire");
    } else {
      var maCarte = {
        question: params["question"],
        reponse: params["reponse"]
      };

      console.log(maCarte);
      //carte de type Json
      //que je veux renvoyer en réppnse
      //convertir json en chaine de caractère
      var maCarteJson = JSON.stringify(maCarte);

      //création d'un chemin data (A CREER) data/valerie.json
      var path = "data/" + req.params.utilisateur + ".json";

      fs.writeFile(path, maCarteJson, function(err) {
        if (err) {
          res.send("Désolé une erreur est survenue...");
          console.error(err);
          throw error; //pas une erreur bloquante
        } else {
          res.render("resultat.ejs", { utilisateur: req.params.utilisateur });
          console.log("J'ai écrit ce fichier avec succès !!!");
        }
      });
    }
  } else {
    res.send("Données incorrectes");
  }
});

app.listen(8080);
