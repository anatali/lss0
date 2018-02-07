/*
* mvcBasic/ctrlGetUsersJsonDataRest.js
*/
var dmodel    = require('./dataModel');
 	
module.exports.getUsers = function( response, cb  ) {
	var query =  dmodel.find(  function (err, users) { //users=array of JSON objects;
  		  cb( err, response, users );	//standard;
    } );   
};

 