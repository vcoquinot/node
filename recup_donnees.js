var http = require("http");
var url = require("url");
var querystring = require("querystring");

var server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  console.log("Page demandée : ", page);
  if (page == "/form.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
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
  }
  //sur page resultat.html
  else if (page == "/resultat.html") {
    //analyse partie query et tableau params
    var params = querystring.parse(url.parse(req.url).query);
    //si dans tableau params **clés** prenom et nom sont présents
    if ("prenom" in params && "nom" in params) {
      //test des valeurs
      //index prénom différent de vide ou nom différent de vide
      //si un des 2 est vide, en-tête 200 (204 pour une partie vide serait possible)
      if (params["prenom"] === "" || params["nom"] === "") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Il faut remplir TOUT le formulaire");
        //si j'ai bien prénom et nom
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(
          "Hey !, vous vous appelez : " + params["prenom"] + " " + params["nom"]
        );
      }
    }
    //201
    else {
      res.writeHead(201, { "Content-Type": "text/html" });
      res.write("Données incorrectes");
    }
    //404
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 : Y'a personne ici...");
    console.error("Une erreur 404 a été retournée");
  }

  res.end();
});
server.listen(8080);
