/*
* mvcBasic/ctrlChangeUserRest.js
*/
var User = require('./dataModel');
 
module.exports.changeUser = function(data, newdata, response, cb){ //data newdata are JSON obj;
	console.log("ctrlDeleteUserRest Changing " + JSON.stringify( data ) );
	User
		.find(data)
		.exec(
			function (err, user) { //user is an array;
				if (err ){
 					cb( err, response, "ERROR in changing user");
 				}else{
					console.log("CHANGING " + JSON.stringify( user ) +  " " + user[0]._id);
					// Do here something with the document to change;
					changeUserData(  user[0], newdata, response, cb );
 				}
			}
		);	
 }

var changeUserData = function(user, newdata, response, cb){
	user.name     = newdata.name;
	user.age      = newdata.age;
	user.password = newdata.password;
	user.save( function(err) { 
		var s ="";
		if (err) s = "ERROR in changing user";
		else s= "Data changed successfully";
  		cb( err, response, s );
	});
}

/*
MONGO
 
db.restaurants.remove( { "borough": "Manhattan" } )
db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )
*/