/*
* appServer/controllers/ctrlDeleteUserRest.js
*/
var User   = require('../models/dataModel');
var utils  = require('../../utils.js'); 
module.exports.deleteUser = function(request, response ){
	var data = request.body;	
	console.log("ctrlDeleteUserRest DELETING " + JSON.stringify( data ) );
	User
		.findOne(data)
		.exec(
			function (err, user) { //user is a single obj;
				if (err) utils.doAnswerStr( err, response, "ERROR in deleting user" ); 
 				else{
 					// Do here something with the document to remove;
					removeUserById( user._id, response  );
				}
			}
		);	
 }

var removeUserById = function(userId, response ) {
	User.findByIdAndRemove(userId, function(err) {
		var s ="";		
        if (err) s = "ERROR in deleting user"; 
         else s = "Data removed successfully";        
         utils.doAnswerStr( err, response, s ); 
    });
}
