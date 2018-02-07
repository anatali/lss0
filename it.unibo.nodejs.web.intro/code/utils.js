/*
 * ---------------------------------------
 * utils.js
 * ---------------------------------------
 */ 
/*
* Application data handling
*/
exports.readData = function(dataArray){
	var s = "";
	dataArray.forEach( function(el,index){
		s = s + JSON.stringify(el) +"\n";
	});
	return s;
}
exports.addData  = function(dataArray){
	dataArray.push( buildNewData(dataArray.length + 1) );
}
buildNewData = function(n){
	var item = { user:"name"+n, age:n+10, pswd:"pwd"+n };
 	return item;
}
/*
 * Data on files
*/
var fs  = require('fs');

exports.readSynchArrayDataFromFile  = function( fName ){
	var lines = fs.readFileSync(fName, 'utf-8')
    .split('\n')
    .filter(Boolean); //lines is ana arry of stringds;
	var data = [] ;	  //an array of json objects;
	lines.forEach( function(el,index) {
		data.push( JSON.parse(el) ); 
	});
	return data;	
}
exports.readeDataFromFile  = function(fName, cb){
	fs.readFile(fName, 'utf8', 
		function(err, data) {
			if (err){
				return 'Could not find or open file for reading';
			}else{
 				cb( data) ;
		}			
	});
};
exports.writeArrayDataOnFile = function(fName, data, cb ){  
	var s = "";
	data.forEach( function(el,index){
		s = s + JSON.stringify(el) +"\n";
	});	 
	fs.writeFile(fName, s, 'utf8', 
			function(err) {
				if (err) throw err;
				else cb( "Now the file has " + data.length +  " elements " ) ;
			});
};
/*
 * uncaughtException handling
 * See https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
 */
process.on('uncaughtException', function (err) {
	console.error('ERROR: got uncaught exception:', err.message);
	process.exit(1);		//MANDATORY!!!
});
process.on('exit', function(code){
	console.log("Exiting code= " + code );
});

/*
 * Finding url parts
 */
var url = require('url'),
   qs   = require('querystring');
 
var requestUtil = function(req,res,cb){
var urlParts    = url.parse(req.url, true),
	urlParams   = urlParts.query, 
	urlPathname = urlParts.pathname,
	body = '',
	reqInfo = {};

req.on('data', function (data) {
 body += data; 
});
req.on('end', function () {
 	//console.log("urlPathname="+urlPathname + " bdoy=" + body + " query="  + JSON.stringify( urlParts.query ) );
	//console.log( urlParts.query );
 	//reqInfo.request     = req;
	reqInfo.method      = req.method;		//'GET'
	reqInfo.urlPathname = urlPathname;  	//'/api/user'
	reqInfo.urlParams   = urlParams;  		//{}
	reqInfo.body        = body;  
	reqInfo.query       = urlParts.query;	//{}
	reqInfo.urlParts    = urlParts;
	//console.log( reqInfo    );
	cb(reqInfo,res);
 });	
}

var doAnswerStr = function(err, response, answer){  //answer: a string  ;
  	if( err ){	response.statusCode=500; response.end(answer); }
  	else { response.statusCode=200; response.end(answer); }
}

