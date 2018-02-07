/*
* appServer/controllers/ctrlAddUserRest.js
*/
var User  = require('../models/dataModel');
//var utils = require('../../utils.js'); 

module.exports.addUser = function(request, response){
	var data = request.body;
  	var newData = new User( {
		  name:     data.name,
		  age:      data.age,
	 	  password: data.password 
	} );
	console.log("ctrlAddUserRest SAVING " + JSON.stringify( newData)  );
	newData.save( function(err) { 
 		if( err ) throw err;
		else  response.redirect("/")
 	});
}
