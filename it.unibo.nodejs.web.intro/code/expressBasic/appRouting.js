/*
* =====================================
* expressBasic/appRouting.js
* =====================================
*/
var express = require("express");
var http    = require("http");

var app  = express();

app.use(function(request, response, next) {
	console.log("Request method=" + request.method + " request.url=" + request.url);
	response.write("middlew0-");
	next();
});

//no next => terminate;
app.get("/", function(request, response) {
	console.log("get / Request =" + request.url);
	response.write("get middlew1:");
	response.end("Welcome to my homepage!");
});

app.get("/about", function(request, response,next) {
	console.log("about page " );
	response.write("get middlew1:Welcome to the about page!-");
	next();
});

app.post("/", function(request, response,next) {
	console.log("post page " );
	response.write("post middlew1-");
	next();
});	

//no next => terminate;
app.use(function( request, response ) {
	console.log("middlew2");
	response.end("middlewEND");
});

//main
http.createServer(app).listen(3000, function(){
	console.log('bound to port 3000');
});