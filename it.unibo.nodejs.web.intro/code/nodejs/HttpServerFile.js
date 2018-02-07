/*
* =====================================
* ndejs/HttpServerFile.js
* =====================================
*/

var utils   = require('../utils');
var http    = require('http');
var fs      = require('fs');
var parse   = require('url').parse;
var join    = require('path').join;
var srvUtil = require("./ServerUtils");

var root = __dirname; //set by Node to the directory path to the file;

http.createServer(function (request, response) {
	var method = request.method;
	var url    = parse(request.url);
	var path   = url.pathname;
	console.log('HttpServerFile method=', method); 
	console.log('HttpServerFile path  =', path); 
	if( path === "/" ) path = "/index.html";
	var fpath = join(root, path);
	if(method === 'GET' && path === '/users' ){  
		srvUtil.renderStaticFile( join(root, "/users.txt"),response);
 		return; 
	};
	if(method === 'GET' ){  //return a file;
		srvUtil.renderStaticFile(fpath,response);
 		return; 
	};
	if(method === 'POST' && path === '/adduser' ) {  
		getDataToAdd(request, response, addDataInFile);
 		return;		
	}
	if(method === 'PUT' && path === '/adduser' ) {  
 		getDataToAdd( request, response, addDataInFile );
 		return;		
	}
	response.end( "Sorry, I don't understand" );
}).listen(3000, function() { console.log('bound to port 3000'); });

/*
 * Data are acquired by handling the event 'data'
 * When data are all available, the given callback is called
 */
var getDataToAdd = function( request, response, callback ){
	var inData = '';
	request.on('data', function (data) { //data is of type Buffer;
        inData += data;	
        // Too much data, kill the connection!;
        if (inData.length > 1e6) request.connection.destroy();
    });
	request.on('end', function () { //data are all available;
		var jsonData = cvtDataToJson(inData);
        callback( JSON.stringify(jsonData), response );  
      });
};


function cvtDataToJson(inData){
	//console.log( "cvtDataToJson "+ inData );
	var jsonData;
 	try{ //assume data already in JSON form;
 		jsonData = JSON.parse( inData );
 	}catch(exception){	//assume data from browser;
 		jsonData = cvtPostStringToJson(inData);
  	}
    //console.log( jsonData );
	return jsonData;
}
	
function cvtPostStringToJson(inData){
    //console.log( "cvtPostStringToJson:" + inData   );
	var jsonData      = {};
	var rawdata       = inData.split('&');
    jsonData.name     = rawdata[0].split('=')[1] ;
    jsonData.age      = rawdata[1].split('=')[1] ;
    jsonData.password = rawdata[2].split('=')[1] ;	
    return jsonData;
}

/*
 * A callback for getDataToAdd. Read old data is sycnh, write is asynch.
 */
var addDataInFile = function(jsonDataStr, response){
	//console.log(   "addDataInFile " +  jsonDataStr );
	var curData = fs.readFileSync('./users.txt', 'utf-8'); 
	if( curData.length > 0 ){
		curData = curData + "\n";
	}
 	curData = curData + jsonDataStr;
	fs.writeFile('users.txt', curData, 'utf8', 
		function(err) { 
			if (err) throw err;
			srvUtil.renderStaticFile( join(root, "/users.txt"),response);
			//response.end("data added");
		} );	
}

/*
 data from browser: name=Bob&age=33&password=pswdBob;

curl -X POST -d  "{\"name\": \"Dave\",\"age\": \"32\",\"password\": \"pswdDave\"}" http://localhost:3000/adduser
*/