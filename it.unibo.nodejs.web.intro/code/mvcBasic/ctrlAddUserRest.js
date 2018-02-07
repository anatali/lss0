/*
* mvcBasic/ctrlAddUserRest.js
*/
var User = require('./dataModel');
 
module.exports.addUser = function(indata, response, cb){
	var data   = cvtDataToJson(indata);
 	var newData = new User( {
		  name:     data.name,
		  age:      data.age,
	 	  password: data.password 
	} );
	console.log("ctrlAddUserRest SAVING " + JSON.stringify( newData)  );
	newData.save( function(err) { 
		var s = "";
		if( err ) s="ERROR in adding user";
		else s="Data saved successfully";
		cb( err, response, s ); //standard;
 	});
}

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
