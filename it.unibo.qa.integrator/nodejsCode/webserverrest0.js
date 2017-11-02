/*
* =====================================
* webserverrest0.js
* =====================================
*/
var http = require('http');
var url  = require('url');
 
var server = http.createServer(function(req, res){
	console.log("      server req=" + req.method  );
  switch (req.method) {
  	case 'GET':
   		res.write( getItems() );
  		res.end()
  		break;
    case 'PUT':
      var item = "";
      req.setEncoding('utf8');
      req.on('data', function(chunk){
    	console.log("      data chunk=" + chunk );
      	item = item + chunk;
      });
      req.on('end', function(){
    	  console.log("      end request"   );
     	  addItem(item)
          res.end('OK\n');
      });
      break;
  }
}).listen(8080);

/*
 * DATA
 */ 
var items = [];

function addItem( item ){
	items.push(item);
}
function getItems(){
	outS="";
	items.forEach(function(item, i){
		console.log("      item="+item);
		outS = outS + i + ') ' + item + '\n';
	});
	return outS;
}

/*
 * TERMINATION
 */ 
process.on('exit', function(code){
	console.log("Exiting code= " + code );
});
//See https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
process.on('uncaughtException', function (err) {
 	console.error('got uncaught exception:', err.message);
 	process.exit(1);		//MANDATORY!!!
});

//=======================================================================
console.log("STARTED" );
/*
 * http://localhost:8080/a b 
*/