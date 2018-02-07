/*
* =====================================
* expressBasic/app.js
* =====================================
*/
var express = require("express");
var http    = require("http");
var logger  = require("morgan");
/*
 * Calls the express function to start a new Express application
 */
var app  = express();   	//returns a requestHandler function;

app.use( logger("short") ) ;	//logger("short") return a middleware function written by Morgan;

app.use(function(request, response, next) {
	console.log("Request =" + request.url);
	response.write("middleware0-");
	next();
});

app.use(function(request, response, next) {
	console.log("middleware1-" + response.statusCode);
	response.write("middleware1-");
	next();
});

app.use(function(request, response, next) {
	console.log("middleware2=" + response);
	response.write("middleware2-");
	response.end("Hello, world from expressBasic/app.js");
});

http.createServer(app).listen(3000, function(){
	console.log('bound to port 3000');
});
