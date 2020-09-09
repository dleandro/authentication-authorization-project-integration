

module.exports = function (authization){
  var express = require('express');
  var router = express.Router();

  /* GET users listing. */
  router.get('/users', function(req, res, next) {
    //just a simple request to the database getting all existing users
    //as you run the module for the first time it will create data model on your database based on a script
    //including a default superuser which represents a user with all permissions
    //as you can see after the login we can access this endpoint, note that sessions are stored on the database, so if you start the app,
    // loggin with one account and restart the app you will still maintain the session
    authization.user.get().then(users=>{
      console.log(users)
      res.send(users)
    })
  });
  return router;
}
