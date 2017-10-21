/*
* =====================================
* webserverrest0.js
* =====================================
*/
var http = require('http');
var url  = require('url');
 
var server = http.createServer(function(req, res){
  switch (req.method) {
  	case 'GET':
   		res.write( getItems() );
  		res.end()
  		break;
    case 'POST':
       var item = "";
      req.setEncoding('utf8');
      req.on('data', function(chunk){
    	//console.log("      data chunk=" + chunk );
      	item = item + chunk;
      });
      req.on('end', function(){
    	  //console.log("      end request"   );
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
console.log("STARTED" );
/*
 * http://localhost:8080/a b 
*/