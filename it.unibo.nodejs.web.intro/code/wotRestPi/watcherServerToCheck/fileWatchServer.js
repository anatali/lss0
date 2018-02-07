/*
 * watcherServer/fileWatchServer.js
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

/*
 * WORKING

app.get("/", function(req,res,next){
	var file = url.parse(req.url).pathname;
 	console.log("requested " + file + " root=" + root);
 	createWatcher('./index.html','reload' );
 	res.sendFile(root + '/index.html');
//	next();
});

 */ 

app.use(function (req, res, next) {
 	  var file = url.parse(req.url).pathname;
	   console.log("requested: " + file  );
	  var mode = 'reload';
	  if (file[file.length - 1] == 's') mode = 'stylesheet'; //for CSS;
	  if (file[file.length - 1] == '/') {
		  file = './index.html';
	   }
	  createWatcher(file, mode);
     next();
});
 

app.use(express.static(root));


//var watchers = {}; //List of being watched files;

function createWatcher (file, mode) {
  var absolute = path.join(root, file);
  console.log("createWatcher: " + absolute  );
//   if (watchers[absolute]) { return; }
  watch(absolute, function (event, file) {
	  console.log("**** " + event + " " + file + " mode="+mode);
	  io.sockets.emit(mode, file);
  });
//  watchers[absolute] = true;  //Mark file as being watched;
}

server.listen(8080, function(){console.log("bound to port 8080")});