/*
* =====================================
* mvcBasic/ServerMVCNaive.js
* =====================================
*/
var http        = require('http');
var fs          = require('fs');
var requestUtil = require('./utilsMongoose.js');   //sets connections; 
var ctrlOut     = require('./ctrlShowUsers');
var ctrlAdd     = require('./ctrlAddUser');
var utils       = require('../utils.js');

var readFile   = utils.readeDataFromFile;

http.createServer( function (request, response) {//request is an IncomingMessage;
	 requestUtil( request, response, handleTheRequest );
}).listen(3000, function() { console.log('bound to port 3000'); });

var handleTheRequest = function(reqInfo,response){
	var request  = reqInfo.method;
	var url      = reqInfo.urlPathname;
	console.log("Server request=" +request + " url=" + url );  
 	if (request  === 'GET' && url==='/') {
		ctrlOut.showUsers( response );
 		return; 
	}
	if (request  === 'GET' && url==='/add') {
		readFile('./index.html', function(data){ response.end(data); });
 		return; 
	}
	if (request  === 'GET'  ){  //style, favicon;
		readFile("."+ url, function(data){ response.end(data); });
 		return; 
	}
	if (request  === 'POST' && url==='/adduser') {
		ctrlAdd.addUser(  reqInfo.body  , response);
 		return;		
	}
	if (request  === 'PUT' && url==='/adduser') {
		ctrlAdd.addUser(  reqInfo.body  , response);
 		return;		
	}
	response.end( "Sorry, I don't understand" );
};



// curl -X PUT -d  "{\"name\": \"Dave\",\"age\": \"32\",\"password\": \"pswdDave\"}" http://localhost:3000/add
 