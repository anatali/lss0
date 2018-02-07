/*
* mvcBasic/ctrlShowUsersRestApi.js
*/
var request = require("request");
var pug     = require('pug');

const compiledFunction = pug.compileFile('dataView.pug');

exports.showUsers = function(response, doAnswer){
	
	var dbUrl = "http://localhost:3000/api/user";
	var optionsRead = { method: 'GET', url: dbUrl, 
		 	headers: 
			{ 'Cache-Control': 'no-cache',
			  'Content-Type': 'application/json' },
			  json: false 
		};
	var readUsers = function(response, doAnswer){	         //get data using the REST API;
		 request(optionsRead, function (error, resp, data) { //data is a list of JSON strings
  			  if (error) throw error;
 			  var html = compiledFunction({ items:  getJSONArray(data)  });		  
 			  doAnswer(error,response,html);	//standard;
		 	});
	};	
 	readUsers(response, doAnswer);
};	

function getJSONArray(jsonStr){
	var jsonData = [];
 	if (jsonStr==="[]" ) return jsonData;
	var rawdata  = jsonStr.split("\n");
	rawdata.forEach( function( s,i ){
 		try{
			if( s.length>0)  //jsd=JSON.parse(s);
			jsonData.push( JSON.parse(s) );
		}catch( e ){
			//console.log("ERROR " + e + " for " + s );
		}
 	});
	return jsonData;
}
  