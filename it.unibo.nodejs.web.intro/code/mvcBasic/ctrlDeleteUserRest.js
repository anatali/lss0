/*
* mvcBasic/ctrlDeleteUserRest.js
*/
var User = require('./dataModel');
 
module.exports.deleteUser = function(data, response, cb){ //data is a JSON obj;
	console.log("ctrlDeleteUserRest DELETING " + JSON.stringify( data ) );
	User
		.findOne(data)
		.exec(
			function (err, user) { //user is a single obj;
				if (err) cb( err, response, "ERROR in deleting user");
 				else{
					console.log("REMOVING " + JSON.stringify( user ) +  " " + user._id);
					// Do here something with the document to remove;
					removeUserById( user._id, response,cb );
				}
			}
		);	
 }

var removeUserById = function(userId, response, cb) {
	User.findByIdAndRemove(userId, function(err) {
		var s ="";		
        if (err) s = "ERROR in deleting user"; 
         else s = "Data removed successfully";        
         cb( err, response, s ); //standard;
    });
}

/*
MONGO
db.restaurants.remove( { "borough": "Manhattan" } )
db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )
*/