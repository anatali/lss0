/*
* appServer/controllers/ctrlGetUsersRest.js
*/
var User  = require('../models/dataModel');
var utils = require('../../utils.js'); 	

module.exports.getUsers = function( request, response   ) {
	var query =  User.find(  function (err, users) { //users=array of JSON objects;
		  var s = "";  
  		  if (err) s = "ERROR " + err; //throw err;
 		  if( users.length == 0)  s =  "[]";
 		  else{
 	   		  users.forEach( function(user,i){
	 			  s = s  + JSON.stringify(user) + "\n";
	  		  });
 		  }
   		  utils.doAnswerStr( err, response, s );
    } );   
};