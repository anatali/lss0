/*
* =====================================
* HttpServerWriteOnFile.js
* =====================================
*/
var http    = require("http");
var fs      = require('fs');
var path    = require('path');
var file    = path.join(process.cwd(), '../sharedFiles/cmd.txt');

http.createServer(function(request, response) {
	//The request object is an instance of IncomingMessage (a ReadableStream and it's also an EventEmitter)
 	var method  = request.method;
	var url     = request.url;
	console.log("Server request method=" + method + " url="+ url);
  	if (request.method === 'GET' && request.url === '/') {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("The server calls the operation press of button");
		storeData(file,"press");
		response.end();
	}
}).listen( 8080, function(){ console.log('bound to port 8080');} );

function storeData(file, newData) {
	  fs.writeFile(file, newData, 'utf8', function(err) {
	    if (err) throw err;
	    console.log('Saved: ' + newData);
	  });
	}

