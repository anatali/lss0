/*
* =====================================
* mvcBasic/ServerMVCRest.js
* =====================================
*/
var ctrlGet     = require('./ctrlGetUsersRest');
var ctrlAdd     = require('./ctrlAddUserRest');
var ctrlDel     = require('./ctrlDeleteUserRest');
var ctrlChng    = require('./ctrlChangeUserRest'); 
var fs          = require('fs');
var http        = require('http');
var requestUtil = require('./utilsMongoose.js');   //sets connections; 
 
http.createServer( function (request, response) {  //request is an IncomingMessage;
 	requestUtil( request, response, handleRequest );
 }).listen(3000, function() { console.log('bound to port 3000'); });

var handleRequest = function(reqInfo,response){
	var request  = reqInfo.method;
  	var url      = reqInfo.urlPathname;

	console.log("Server request=" +request + " url=" + url);
	switch ( request ){
		case 'GET' :
			if( url === '/api/user' ){
				ctrlGet.getUsers(  response, doAnswerStr );
			}else{ response.statusCode=400; response.end("ERROR on GET"); } 
			break;
		case 'POST' :
			if( url==='/api/user'  ){
				ctrlAdd.addUser(  reqInfo.body, response, doAnswerStr );
			}else{ response.statusCode=400; response.end("ERROR on POST"); }
			break;
		case 'PUT':
			if( url === '/api/user' ){  //accepts only JSON format;
				var jsonBody = JSON.parse(  reqInfo.body  );
				console.log("oldUser=" + jsonBody.old);
				console.log("chngUser=" + jsonBody.new);
 				ctrlChng.changeUser(jsonBody.old, jsonBody.new, response, doAnswerStr );
			}else{ response.statusCode=400; response.end("ERROR on PUT"); }
			break;
		case 'DELETE':
			if( url === '/api/user' ){ // for JSON only;
				ctrlDel.deleteUser( JSON.parse( reqInfo.body ), response, doAnswerStr);
 			}else{ response.statusCode=400; response.end("ERROR on DLEETE"); }
			break;
		default:{
			response.writeHead(405, {'Content-type':'application/json'});
			response.end(  "METHOD ERROR"  );		
		}
	}//switch;
}
 
var doAnswerStr = function(err, response, msg){
 	if( err ){	response.statusCode=500; response.end(msg); }
	else{ response.statusCode=200; response.end(msg); }
} 