/*
* appServer/controllers/ctrlChangeUserRest.js
*/
var User = require('../models/dataModel');
var utils = require('../../utils.js'); 

module.exports.changeUser = function(request, response ){
 	var oldUser  =  request.body.old ;
	var chngUser =  request.body.new ;
	console.log( request.body  );
	console.log( oldUser  );
	console.log("oldUser="  + oldUser + " chngUser=" + chngUser);
	User
		.find(oldUser)
		.exec(
			function (err, user) { //user is an array;
				if (err ){
  					utils.doAnswerStr( err, response, "ERROR in changing user" ); 
 				}else{
 					// Do here something with the document to change;
					changeUserData(  user[0], chngUser, response  );
 				}
			}
		);	
 };

var changeUserData = function(user, newdata, response ){
	if( ! user ){
		console.log("ERROR in changing : no user");
		utils.doAnswerStr( null, response, "ERROR: no user" );
		return;
	} 
	user.name     = newdata.name;
	user.age      = newdata.age;
	user.password = newdata.password;
	user.save( function(err) { 
		var s ="";
		if (err) s = "ERROR in changing user";
		else s= "Data changed successfully";
   		utils.doAnswerStr( err, response, s ); 
	});
}
 