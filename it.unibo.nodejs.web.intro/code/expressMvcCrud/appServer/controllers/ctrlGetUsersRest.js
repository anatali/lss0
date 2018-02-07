/*
* appServer/controllers/ctrlGetUsersRest.js
*/
var User  = require('../models/dataModel');
var utils = require('../../utils.js'); 	

module.exports.getUsers = function( request, response   ) {
 	var query =  User.find(  function (err, users) { //users=array of JSON objects;
   		  if (err) throw err;
   		  utils.doAnswerApi(200,response,users);
    } );   
};

 