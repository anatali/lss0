/*
* =====================================
* mvcBasic/CrudRestServer.js
* =====================================
*/
var ctrlGet     = require('./ctrlGetUsersRest');	//returns a string of JSON string lines;
var ctrlAdd     = require('./ctrlAddUserRest');
var ctrlDel     = require('./ctrlDeleteUserRest');
var ctrlChng    = require('./ctrlChangeUserRest'); 
//var ctrlIn      = require('./ctrlAddUser');
var ctrlOut     = require('./ctrlShowUsersRestApi');	//returns a generated HTML string;
var fs          = require('fs');
var http        = require('http');
var requestUtil = require('./utilsMongoose.js');   //sets connections; 
var utils       = require('../utils.js');

var readFile   = utils.readeDataFromFile;

http.createServer( function (request, response) {  //request is an IncomingMessage;
 	requestUtil( request, response, handleRequest );
 }).listen(3000, function() { console.log('bound to port 3000'); });

var handleRequest = function(reqInfo,response){
	var request  = reqInfo.method;
 	var url      = reqInfo.urlPathname;
	console.log("Server request=" +request + " url=" + url  );

	switch ( request ){
		case 'GET' :
			if( url === '/' ){
				ctrlOut.showUsers( response, doAnswerStr );				
			}else if(  url === '/add'  ){ //open the file index.html with the add form;
				readFile('./index.html', function(data){ response.end(data); });
			}else if( url === '/api/user' ){ 
				ctrlGet.getUsers( response, doAnswerStr );
			}else{ 
				readFile("."+ url, function(data){ response.end(data); });
 			} 
			break;
		case 'POST' :
			if( url === "/adduser"){  //sent by the browser (index.html);
				//ctrlIn.addUser(  reqInfo.body  , response);
				ctrlAdd.addUser(  reqInfo.body, response, doAnswerStr );
			}else if( url==='/api/user'  ){
 				ctrlAdd.addUser(  reqInfo.body, response, doAnswerStr );
			}else{ response.statusCode=400; response.end("ERROR on POST"); }
			break;
		case 'PUT':
			if( url === '/api/user' ){	//sent via curl or POSTMAN; 
				var jsonBody = JSON.parse(  reqInfo.body  );
				console.log("oldUser="  + jsonBody.old + " chngUser=" + jsonBody.new);
 				ctrlChng.changeUser(jsonBody.old, jsonBody.new, response, doAnswerStr);
			}else{ response.statusCode=400; response.end("ERROR on PUT"); }
			break;
		case 'DELETE':
			if( url === '/api/user' ){ //sent via curl or POSTMAN; 
				ctrlDel.deleteUser( JSON.parse( reqInfo.body ), response, doAnswerStr);
 			}else{ response.statusCode=400; response.end("ERROR on DLEETE"); }
			break;
		default:{
			response.writeHead(405, {'Content-type':'application/json'});
			response.end(  "METHOD ERROR"  );		
		}
	}//switch;
}

var doAnswerStr = function(err, response, answer){  //answer: a string  ;
  	if( err ){	response.statusCode=500; response.end(answer); }
  	else { response.statusCode=200; response.end(answer); }
}



var doAnswerJson = function(err, response, answer){  //answer:  an array of JSON data;
  	if( err ){	response.statusCode=500; response.end(answer); }
   	else { response.statusCode=200; response.end( cvtJsonArrayToStr(answer) ); }
}
function cvtJsonArrayToStr(jsonArray){
	var s="";
	if( jsonArray.length == 0) s = "No data";
	else jsonArray.forEach( function(el,i){ s = s  + JSON.stringify(el) + "\n"; });	
	return s;
}
