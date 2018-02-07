/*
* =====================================
* expressBasic/appStaticFiles.js
* =====================================
*/
var express = require("express");
var http    = require("http");
var path    = require("path");

var app  = express();

//Sets up the public path, using Node’s path module;
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(function(request, response) {
	response.writeHead(200, { "Content-Type": "text/plain" });
	response.end("Static file not found.");
});

http.createServer(app).listen(3000, function(){
	console.log('bound to port 3000');
});