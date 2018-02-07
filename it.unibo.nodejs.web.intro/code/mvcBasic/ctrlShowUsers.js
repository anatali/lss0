/*
* mvcBasic/ctrlShowUsers.js
*/
var dmodel    = require('./dataModel');
var pug       = require('pug');

const compiledFunction = pug.compileFile('dataView.pug');

exports.showUsers = function(response){
	var query =  dmodel.find(  function (err, users) {
		  var html ;
		  if (err) throw err;
		  if( users == null ) html = compiledFunction({ items: []  });
		  else html = compiledFunction({ items: users  });		  
		  response.statusCode=200;
		  response.write(html);
		  response.end();
	} );  
};
  