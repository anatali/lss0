/*
* =====================================
* HttpServerCrud.js
* =====================================
*/
var http = require("http");
var dataStore = [];	//Array of Buffers
var fs      = require('fs');
var path    = require('path');
var file    = path.join(process.cwd(), '../sharedFiles/cmd.txt');

http.createServer(function(request, response) {
	//The request object is an instance of IncomingMessage (a ReadableStream; it's also an EventEmitter)
	var headers   = request.headers;
	var method    = request.method;
	var url       = request.url;
	console.log('method=' + method );
	if( method == 'GET'){
		dataStore.forEach( function(v,i){
			response.write( i + ")" + v + "\n")
		});
		response.end();
	}//if GET
 	if( method == 'POST' ||  method == 'PUT'){
		var item = '';
		request.setEncoding("utf8"); //a chunk is a utf8 string instead of a Buffer
		request.on('error', function(err) {
		    console.error(err);
		  });
		request.on('data', function(chunk) { //a chunck is a byte array
 		    item = item + chunk;
 		  });
		request.on('end', function() {
				//dataStore = Buffer.concat(dataStore).toString();
 				dataStore.push(item);
				console.log("dataStore=" + dataStore); 
				buildResponse( url, method, response );
 		  });
	}//if POST PUT
}).listen( 8080, function(){ console.log('bound to port 8080');} );

function buildResponse( url, method, response ){
		response.on('error', function(err) { console.error(err); });	
	    response.statusCode = 200;
	    response.setHeader('Content-Type', 'application/json');
	    //response.writeHead(200, {'Content-Type': 'application/json'}) //compact form	
	    var responseBody = {
	      //headers: headers,	//comment, so to reduce output
	      method: method,
	      url:    url,
	      dataStore:   dataStore 
	    };	
	    response.write( JSON.stringify(responseBody) );
	    storeData(file,"press");
	    response.end();
	    //response.end(JSON.stringify(responseBody)) //compact form		
}
console.log('Server running on 8080');


function storeData(file, newData) {
	  fs.writeFile(file, newData, 'utf8', function(err) {
	    if (err) throw err;
	    console.log('Saved: ' + newData);
	  });
	}
