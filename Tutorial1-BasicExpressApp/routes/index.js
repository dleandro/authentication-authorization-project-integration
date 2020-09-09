

module.exports = function (authization){
  var express = require('express');
  var router = express.Router();

  //because we need to authenticate users we will need to have a login endpoint, I will be using local login which is provided by the module
  // but there are also available on the module login through IDP's like google using OpenId
  router.post('/login',authization.authenticate.usingLocal,(req, res, next) => {
    //just to know if the user was sucessfully logged in
    res.send(req.isAuthenticated?'login with sucess':'unable to loggin');
  });

  // this endpoint will be where we submit the login request , so I'm gonna copy/paste some basic form html to do it just to simplify
  router.get('/', function(req, res, next) {
    res.send("<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <title>Login V3</title>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
        "</head>\n" +
        "<body>\n" +
        "<form action=\"/login\" method=\"post\">\n" +
        "    <div class=\"container\">\n" +
        "        <label for=\"username\"><b>Username</b></label>\n" +
        "        <input type=\"text\" placeholder=\"Enter Username\" name=\"username\" required>\n" +
        "\n" +
        "        <label for=\"password\"><b>Password</b></label>\n" +
        "        <input type=\"password\" placeholder=\"Enter Password\" name=\"password\" required>\n" +
        "\n" +
        "        <button type=\"submit\">Login</button>\n" +
        "    </div>\n" +
        "</form>\n" +
        "</body>\n" +
        "</html>")
  });

  return router;
}
