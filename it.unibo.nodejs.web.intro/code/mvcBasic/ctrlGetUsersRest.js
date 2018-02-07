/*
* mvcBasic/ctrlGetUsersRest.js
*/
var dmodel    = require('./dataModel');
 	
module.exports.getUsers = function( response, cb  ) {
	var query =  dmodel.find(  function (err, users) { //users=array of JSON objects;
		  var s = "";  
  		  if (err) s = "ERROR " + err; //throw err;
 		  if( users.length == 0)  s =  "[]";
 		  else{
 	   		  users.forEach( function(user,i){
	 			  s = s  + JSON.stringify(user) + "\n";
	  		  });
 		  }
  		  cb( err, response, s );	//standard;
    } );   
};

 