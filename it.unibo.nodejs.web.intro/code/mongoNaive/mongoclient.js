/*
 * mongoNaive/mongoclient.js
 */
var MongoClient = require('mongodb').MongoClient;
require('../utils.js');

var dbase  ;
var client ;
var dbUrl = "mongodb://localhost:27017";

var init = function( application){
	console.log("init "  );
	//Connect to the db from version 3.0;
	MongoClient.connect(dbUrl, function (err, curclient) {   
		if (err) throw err;	
		console.log("connected "  );
		client  = curclient;
		dbase   = client.db('mongoNaive');	//the db used;
 		application();
	});	
}
 
var itemsNum = 0;
var writeData = function(  ){
	dbase.collection('users', function (err, coll) { 
		if( err ) throw err;
    	itemsNum = itemsNum + 1;
    	var name = 'Name' + itemsNum;
    	var age  = itemsNum*2;
    	var pswd = 'pwd'  + itemsNum;
        coll.insert(  {   name: name, age: age, password: pswd }  );
    	console.log('writeData done name=' + name + " age:" + age+ " pswd=" + pswd);
    });
}//writeData;

var curData;
var readData = function(  ){
	dbase.collection( 'users' , function (err, data) {   
		if (err) throw err;   
		curData = data.find( {} ); //The result for the query is actually a cursor object;
     });
};//readData;

var showCurData = function(  ){
	curData.each( function(err, item) {
	    if(err)        throw err;
	    if(item==null) return;       	 
	    console.log( item.name + " age:" + item.age + " pswd=" + item.password  );
    });	
}

var applicationJob = function(  ){	
	console.log("application starts "  );
	dbase.collection( 'users' ).count()  //a promise;
	.then( function(value) {
		itemsNum = value;
		console.log("itemsNum=" + itemsNum);
	})
	.then( function(){ console.log("initially we have " + itemsNum + " users"); } )
	.then( writeData )
 	.then( writeData )
	.then( function(){ console.log("at the end we have " + itemsNum + " users"); } )
	.then( readData  )
	.then( showCurData )
	.then( function(){
		console.log("===================== ")
		client.close();
	});
}	

init( applicationJob );


//npm install mongodb --save
//See https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
//MERN (MongoDB, Express, React, Node.js) 
