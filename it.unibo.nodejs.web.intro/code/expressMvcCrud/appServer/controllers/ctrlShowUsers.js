/*
* appServer/controllers/ctrlShowUsers.js
*/
var User = require('../models/dataModel');
var pug   = require('pug');

const compiledFunction = pug.compileFile('./appServer/views/dataView.pug');

exports.showUsers = function(request,response){
	var query =  User.find(  function (err, users) {
		  var html ;
		  if (err) throw err;
		  if( users == null ) html = compiledFunction({ items: []  });
		  else html = compiledFunction({ items: users  });		  
		  response.statusCode=200;
		  response.write(html);
		  response.end();
	} );  
};
  