/*
* =====================================
* nodejs/HttpBasicServer.js
* =====================================
*/
var http    = require("http");
var fs      = require('fs');
var parse   = require('url').parse;
var join    = require('path').join;
var srvUtil = require("./ServerUtils");

var root = __dirname; //set by Node to the directory path to the file;

var handleRequest = function (request, response) { 
	var url  = parse(request.url);
	console.log("HttpBasicServer request.method=" + request.method + " url.pathname=" + url.pathname); 
	//console.log('HttpBasicServer root=', root); 
 	if( url.pathname === "/" ) url.pathname = "/index.html";
	var path = join(root, url.pathname);
	console.log('HttpBasicServer path=', path); 
	srvUtil.renderStaticFile(path,response);
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
};
main();
