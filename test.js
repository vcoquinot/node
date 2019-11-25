// var http = require("http");
// var url = require("url");

// var server = http.createServer(function(req, res) {
//   var page = url.parse(req.url).pathname;
//   console.log(page);
//   res.writeHead(200, { "Content-Type": "text/html" });
//   if (page == "/") {
//     res.write("<strong>Hello World</strong>");
//   } else if (page == "/bonjour.html") {
//     res.write("<strong>Bonjour !</strong>");
//   } else if (page == "/au_revoir.html") {
//     res.write("<strong>Bonsoir !</strong>");
//   }
//   res.end();
// });
// server.listen(8080);

// var http = require("http");
// var url = require("url");

// var server = http.createServer(function(req, res) {
//   var page = url.parse(req.url).pathname;
//   console.log("Page demandée : ", page);
//   if (page == "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write("<strong>Hello World</strong>");
//   } else if (page == "/bonjour.html") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write("<strong>Bonjour !</strong>");
//   } else if (page == "/au_revoir.html") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write("<strong>Bonsoir !</strong>");
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.write("404 : Y'a personne ici...");
//     console.error("Une erreur 404 a été retournée");
//   }

//   res.end();
// });
// server.listen(8080);

// var http = require("http");
// var url = require("url");
// var querystring = require("querystring");

// var server = http.createServer(function(req, res) {
//   var page = url.parse(req.url).pathname;
//   console.log("Page demandée : ", page);
//   if (page == "/form.html") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(
//       "<!DOCTYPE html>" +
//         "" +
//         "    " +
//         "        <meta charset='utf-8'>" +
//         "        <title>Mon formulaire</title>" +
//         "    " +
//         "    " +
//         "     	<form action='/resultat.html' method='GET'>" +
//         "           <input type='text' name='nom' placeholder='votre nom'>" +
//         "           <input type='text' name='prenom' placeholder='votre prénom'>" +
//         "           <button type='submit'>GO</button>" +
//         "       </form>" +
//         "    " +
//         ""
//     );
//   }
//   //sur page resultat.html
//   else if (page == "/resultat.html") {
//     //analyse partie query et tableau params
//     var params = querystring.parse(url.parse(req.url).query);
//     //si dans tableau params prenom et nom sont pr
//     if ("prenom" in params && "nom" in params) {
//       if (params["prenom"] === "" || params["nom"] === "") {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write("Il faut remplir TOUT le formulaire");
//       } else {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write(
//           "Hey !, vous vous appelez : " + params["prenom"] + " " + params["nom"]
//         );
//       }
//     } else {
//       res.writeHead(201, { "Content-Type": "text/html" });
//       res.write("Données incorrectes");
//     }
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.write("404 : Y'a personne ici...");
//     console.error("Une erreur 404 a été retournée");
//   }

//   res.end();
// });
// server.listen(8080);
//******************************************** */
//EXPRESS
var express = require("express");
var app = express();
var url = require("url");
var querystring = require("querystring");

app.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send("<strong>Hello World</strong>");
});

app.get("/form.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(
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

  if ("prenom" in params && "nom" in params) {
    if (params["prenom"] === "" || params["nom"] === "") {
      res.send("Il faut remplir TOUT le formulaire");
    } else {
      res.send(
        "Hey ! Vous vous appelez : " + params["prenom"] + " " + params["nom"]
      );
    }
  } else {
    res.send("Données incorrectes");
  }
});

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/html");
  res.status(404).send("404 : Y'a personne ici...");
  console.error("Une erreur 404 a été retournée");
});

app.listen(8080);
