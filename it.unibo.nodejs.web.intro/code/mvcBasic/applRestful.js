/*
 * mvcBasic/applRestful.js
 */
var request = require("request");
require('../utils');

var dbUrl = "http://localhost:3000/api/user";

//Create a new user Alice ===================================;
var optionsCreateAlice = { 
   method: 'POST', 
   url: dbUrl, 
   body: "name=Alice&age=25&password=pswdAlice",
 };
var createUserAlice = function(){
	request( optionsCreateAlice, function (error, response, body) {	
	  if (error) throw new Error(error);
	  console.log("ANSWER createUserAlice from server:"+body);
  	});
};

//Create a new user Bob ===================================;
var optionsCreate = { method: 'POST', url: dbUrl, 
   headers: 
   { 'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { name: 'Bob', age: '28', password: 'pswdBob' },
  json: true 
};
var createUserBob = function(){
 	request( optionsCreate, function (error, response, body) {	
	  if (error) throw new Error(error);
	  console.log("ANSWER createUserBob from server:"+body);
   	});
};

//Read all the users ===================================;
var optionsRead = { method: 'GET', url: dbUrl, 
 	headers: 
	{ 'Cache-Control': 'no-cache',
	  'Content-Type': 'application/json' },
	  json: true 
};
var readUsers = function(){
 	request(optionsRead, function (error, response, body) {
	  if (error) throw new Error(error);
  	  console.log( body );
 	});
};

//Change an user ===================================;
var optionsChangeBob = { method: 'PUT', url: dbUrl, 
 	headers: 
	{ 	'Cache-Control': 'no-cache',
			'Content-Type': 'application/json' },
		body: { "old": {"name": "Bob", "age": "28", "password": "pswdBob"}, 
			    "new":{"name": "Bob", "age": "28", "password": "newPswdBob"} },
	    json: true 
	};
var updateUser = function(){
 	request(optionsChangeBob, function (error, response, body) {	
	  if (error) throw new Error(error);
	  console.log("ANSWER updateUser from server:"+body);
   	});
};

//Delete an user ===================================;
var optionsDeleteBob = { method: 'DELETE', url: dbUrl,
 	headers: 
	{ 	'Cache-Control': 'no-cache',
		'Content-Type': 'application/json' },
	     body: { name: 'Bob', age: '28', password: 'newPswdBob' },
	     json: true 
};
var deleteUser = function(){
 	request(optionsDeleteBob, function (error, response, body) {	
	  if (error) throw new Error(error);
	  console.log("ANSWER deleteUser from server:"+body);
   	});
};


//Application ===================================;
var application = function(){
	readUsers();
	setTimeout( createUserAlice, 200  );	  
	setTimeout( readUsers,       400  );	    
	setTimeout( createUserBob,   600  );	  
	setTimeout( readUsers,       800  );	    
	setTimeout( updateUser,      1000 );	 
	setTimeout( readUsers,       1200 );	    
	setTimeout( deleteUser,      1400 );	 
	setTimeout( readUsers,       1500 );	    
}
application(  );
