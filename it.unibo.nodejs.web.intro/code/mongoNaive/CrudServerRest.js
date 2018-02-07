/*
* =====================================
* mongoNaive/CrudServerRest.js
* =====================================
*/
var mongoose = require('mongoose');
var http     = require('http');
//var DataItem = require("./dataItem");  
require('../utils.js');

var count = 1;

/*
 * Function used to handle requests
 */
var handleRequest = function (request, response) { //request has many info
	console.log('HttpServerNodeRequest REQUEST METHOD=', request.method); 
	console.log('HttpServerNodeRequest REQUEST URL=',    request.url);  
 	if( request.url==="/read" ) {
 	  	response.write("read data");
 	  	readData(response);
 		return;
 	}
 	if( request.url==="/write" ) {
  	  	writeData(response);
  		return;
 	}
  	response.end("Hello world from CrudServer");
};


var writeData = function(response){
	var data = new DataItem( { name : "name" + count++, password : "p"+count } );
	data.save()        
		.then(item => {
			response.end("saved to database:" + JSON.stringify(data));
		})
		.catch(err => {
	    	console.log("Unable to save to database");
	        response.status(400).send("Unable to save to database");
		});
}

var readData = function(response){
	DataItem.find(function (err, users) {
		  if (err) return console.error(err);
		  var s = JSON.stringify(users);
		  console.log(s);
		  response.end( s );  
	});
}

/*
 * Configure and start the server
 * npm install mongoose --sav
 */ 
function main(){
	var server = http.createServer();
	server.on( 'request' , handleRequest); 
	mongoose.connect("mongodb://localhost:27017/mongobase");
	
	server.listen(3000, function() { 
		console.log('CrudServer bound to port 3000');
	});	
}

main();

