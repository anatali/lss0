/*
 * nodejs/serverUsage.js
 */
require('../utils');
var request = require("request");

var urlReadAdd = 'http://localhost:3000/users';
readData = function(cbflow){
	var options = { method: 'GET', url: urlReadAdd };
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  console.log(" --- serverUsage readData:"  );
	  console.log(body);
	  cbflow( null, 'read' );
	});
};

var urlAdd = 'http://localhost:3000/adduser';
addJsonData = function(jsonData, cbflow){
	var options = { method: 'PUT', url: urlAdd,
			body: jsonData,
			json: true};
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		console.log(" --- serverUsage addJsonData:"  );
		console.log( body);
		cbflow( null, 'writeJson' );
	});
};

addPostLikeData = function(stringData, cbflow){
	var options = { method: 'POST', url: urlAdd,
			body: stringData,
			json: false};
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		console.log(" --- serverUsage addPostLikeData:"  );
		console.log( body);
		cbflow( null, 'writePostLike' );
	});
};

var async   = require('async');
//sequential flow;
var sequenceCall = function(){
	async.series([
 			function(cbflow){ readData(  cbflow );  },
  			function(cbflow){ addJsonData({name: 'Alice', age: '22', password: 'pswdAlice' }, cbflow );},
			function(cbflow){ addPostLikeData( "name=Dave&age=34&password=pswdDave", cbflow );},
  			function(cbflow){ addJsonData({name: 'Bob',   age: '25', password: 'pswdBob'  }, cbflow );},
 			function(cbflow){ readData(  cbflow );  }
		],
		// optional callback;
		function(err, results) {
			console.log("result=" + results);
		});
};

sequenceCall();



var wrongSequenceCall = function(){
	console.log("1");
	readData( function(err, results){ console.log("1"); }  );
	console.log("2");
	addJsonData( function(err, results){ console.log("2"); } );
	console.log("3");
	readData( function(err, results){ console.log("3"); }  ); 	
};
//wrongSequenceCall();
/*
 * OUTPUT of wrongSequenceCall with an empty file

1
2
3
 --- readData:
1
 --- readData:
3
 --- addJsonData:Now the file has 1 elements
2
 */