//creation var http qui fait appel au module http
var http = require("http");

var url = require("url");

//création serveur
var server = http.createServer(function(req, res) {
  //initialisation page
  //prend juste la route (bonjour.html)
  var page = url.parse(req.url).pathname;
  //affichage de la page demandée
  console.log(page);

  //contenu html avec en-tête 200
  res.writeHead(200, { "Content-Type": "text/html" });
  //racine du site
  if (page == "/") {
    res.write("<strong>Hello World</strong>");
    //page bonjour
  } else if (page == "/bonjour.html") {
    res.write("<strong>Bonjour !</strong>");
    //page au revoir
  } else if (page == "/au_revoir.html") {
    res.write("<strong>Bonsoir !</strong>");
  }
  //réponse terminée, envoi au navigateur
  res.end();
});
server.listen(8080);
