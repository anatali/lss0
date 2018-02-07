/*
* appServer/controllers/ctrlShowUsersRestApi.js
*/
var request = require("request");
 
exports.showUsers = function(req,response){
    //get data using the REST API;
	var dbUrl = "http://localhost:3000/api/user";
	var optionsRead = { method: 'GET', url: dbUrl,
		 	headers: 
			{ 'Cache-Control': 'no-cache',
			  'Content-Type': 'application/json' },
			  json: true 
  		};
	 request(optionsRead, function (error, resp, jsonData) { //array of JSON data;
 		 if (error)  throw error;
   		 response.render( "dataView",  { users: jsonData  } );
	 	});
};	
  