/*
* =====================================
* nodejs/HttpServerRequest.js
* =====================================
*/
var utils = require('../utils');
var http  = require('http');

var applData = [];	//Application data;

var handleRequest = function (request, response) { //request has many info;
	console.log('HttpServerNodeRequest REQUEST METHID=', request.method); 
	console.log('HttpServerNodeRequest REQUEST URL=',    request.url);  
 	if( request.url==="/" ) {
 		var outS = "Hello from HttpServerRequest. Current data:\n";
 		outS = outS + utils.readData(applData);
 		response.end( outS );
 		return;
 	}
 	if( request.url==="/read" ) {
 		if( applData.length == 0 ) response.end( "Sorry, no data" ); 
 		else response.end( utils.readData(applData) );
 		return;
 	}
 	if( request.url==="/add" ) {
 		utils.addData(applData);
 		response.end( utils.readData(applData) );
 		return;
 	}
 	response.end( "Sorry, I don't undederstand " );
};


function main(){
//configure the system;
	console.log('HttpServerRequest cretae a servere and register handleRequest');
	var server = http.createServer();
	server.on( 'request' , handleRequest); 
//start;
	console.log('HttpServerNodeRequest running on 3000/');
	server.listen(3000, function() { 
		console.log('bound to port 3000');
	});	
}

main();