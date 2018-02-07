/*
* =====================================
* expressBasic/appLongAction.js
* =====================================
*/
var express = require("express");
var http    = require("http");
var logger  = require("morgan");

/*
 * Calls the express  function to start a new Express application
 */
var app     = express();
/*
 * Simulate a long action
 */
var count = 1;
var longAction = function( duration ){
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + duration);
}

app.use( logger("short") ) ;	//logger("short") return a middleware function written by Morgan

app.use(function(request, response, next) {
 	console.log("middleware0- long action" + request.url + " count=" + count );
 	response.write("middleware0-"+count); 
	if( count++ == 1 ) longAction( 10000 );	//Delay the first call
	next();
});

app.use(function(request, response, next) {
	console.log("middleware1-" + response.statusCode);
	response.end("End of expressBasic/appLongAction.js");
	next();
});

http.createServer(app).listen(3000, function(){
	console.log('bound to port 3000');
});
/*
 * uncaughtException
 */ 
process.on('exit', function(code){
	console.log("Exiting code= " + code );
});
//See https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
process.on('uncaughtException', function (err) {
	console.error('ERROR: got uncaught exception:', err.message);
	process.exit(1);		//MANDATORY!!!
});
