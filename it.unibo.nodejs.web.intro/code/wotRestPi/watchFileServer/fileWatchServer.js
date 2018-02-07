/*
 * watchFileServer/fileWatchServer.js
 */
var fs      = require('fs');
var url     = require('url');
var express = require('express');
var http    = require('http');
var path    = require('path');
var watch   = require('node-watch');

var app     = express();
var server  = http.createServer(app);
var io      = require('socket.io').listen(server); //Wrap;

var root    = __dirname;

app.get("/", function(req,res,next){
	var path = url.parse(req.url).pathname;
  	createWatcher('./index.html','reload' );
 	res.sendFile(root + '/index.html');
});

app.use(express.static(root));

var watchers = {}; //List of being watched files;

function createWatcher (file, mode) {
  var absolute = path.join(root, file);
  console.log("createWatcher: " + absolute  );
  if (watchers[absolute]) { return; } //already created;
  watch(absolute, function (event, file) {
	  console.log("**** " + event + " " + file + " mode="+mode);
	  io.sockets.emit(mode, file);
  });
  watchers[absolute] = true;  //Mark file as being watched;
}

server.listen(8080, function(){console.log("bound to port 8080")});