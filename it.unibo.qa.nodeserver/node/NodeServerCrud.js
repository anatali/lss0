/*
* =====================================
* NodeServerCrud.js
* =====================================
*/
var net  = require('net');
var http = require("http");
var dataStore = [];	//Array of Buffers

var msgNum=1;
var host   = process.argv[2];
var port   = Number(process.argv[3]);
var socketToQaCtx = null;
/*
 * UTILITIES 
 * See https://developer.mozilla.org/en-US/docs/Web/API/WebsocketToQaCtx 
 */
function connectToQaNode(){
 	try{
		socketToQaCtx = net.connect({ port: port, host: host });
		socketToQaCtx.setEncoding('utf8');	
		console.log('connected to qa node:' + host + ":" + port);
	}catch(e){ 
		console.log(" ------- connectToQaNode ERROR "  + e + " socketToQaCtx=" + socketToQaCtx); 
 	}
}

//Error handlers
process.on("uncaughtException", function(reason) {
//	console.log("		uncaughtException reason=", reason)	;
    console.log("uncaughtException:"+reason.message + " socketToQaCtx=" + socketToQaCtx );            
    socketToQaCtx = null;
});

/*
 * The server attempts a connection to a given qa context node, e.g.
 * node NodeServerCrud.js localhost 8071
 * If there is no qa node, socketToQaCtx is set to null by the uncaughtException
 */
connectToQaNode();

/*
 * Handle the qaanswer from the qa node
 */
if( socketToQaCtx != null){
var qaanswer = "";
	console.log("NodeServer SETUP socketToQaCtx ---- ");
	socketToQaCtx.on('data',function(data) {
 		qaanswer = qaanswer + data;
  		if( qaanswer === "" ) return;
		if( data.includes("\n") ){
			console.log(  "NodeServerCrud: "+qaanswer );
			qaanswer = "";
		}
	});  
	  
	socketToQaCtx.on('close',function() {
		console.log('connection is closed');
	});
	socketToQaCtx.on('end',function() {
		console.log('connection is ended');
	});
 
}

/*
 * CREATE a server that handles GET, PUT/POST
 * For each operation server emits (via emitQaEvent) an event usercmd:usercmd(X)
 * GET: 		usercmd:usercmd(get)
 * PUT/POST : 	usercmd:usercmd(DATA)
 * It also gives a response to the caller (browser/POSTMAN/httpclient)
 * TODO:  the response could be given by the qa application
 */
http.createServer(function(request, response) {
	//The request object is an instance of IncomingMessage (a ReadableStream; it's also an EventEmitter)
	var headers   = request.headers;
	var method    = request.method;
	var url       = request.url;
 	//console.log('method=' + method );
	if( method == 'GET'){
		var outS = "";
		if( dataStore.length == 0 ) outS ="no data";
		//console.log("dataStore=" + dataStore.length + " outS=" + outS); 
		dataStore.forEach( function(v,i){
			outS = outS +  i + ")" + v + "\n"
		});
		response.write( outS )
		response.end();			//qaanswer to the caller
		emitQaEvent( "get" );	//emit event usercmd
		//WARNING: The response should be given by the qa
	}//if GET
 	if( method == 'POST' ||  method == 'PUT'){
		var item = '';
		request.setEncoding("utf8"); //a chunk is a utf8 string instead of a Buffer
		request.on('error', function(err) {
		    console.error(err);
		  });
		request.on('data', function(chunk) { //a chunck is a byte array
 		    item = item + chunk; 	
 		    console.log('method=' + method + " data=" + item);
		 });
		request.on('end', function() {
				//dataStore = Buffer.concat(dataStore).toString();
 				dataStore.push(item);
// 				console.log("dataStore=" + dataStore); 
  				emitQaEvent( item );
				buildHtmlResponse( url, method, dataStore, response );
				//WARNING: The response should be given by the qa
 		  });
	}//if POST PUT
}).listen( 8080, function(){ console.log('bound to port 8080');} );

function buildHtmlResponse( url, method, data, response ){
		response.on('error', function(err) { console.error(err); });	
	    response.statusCode = 200;
	    response.setHeader('Content-Type', 'application/json');

	    //response.writeHead(200, {'Content-Type': 'application/json'}) //compact form	
	    var responseBody = {
	      //headers: headers,	//comment, so to reduce output
	      method: method,
	      url:    url,
	      dataStore:   dataStore 
	    };	
	    response.write( JSON.stringify(responseBody) );
	    response.end();
	    //response.end(JSON.stringify(responseBody)) //compact form		
}
console.log('Server running on 8080');


function emitQaEvent( payload ) {
 	try{
 		var msg = "msg(usercmd,event,nodeserver,none,usercmd(nodeserver,'" +  payload +"')," + msgNum++ +")";
  		if(socketToQaCtx !== null ){
  	  		console.log('emitQaEvent mmsg=' + msg    ); 
  			socketToQaCtx.write(msg+"\n");
  			//TDOO: wait an qaanswer from the qa before responding to the HTTP user
  		}
	}catch(e){ 
  		console.log("WARNING: "  + e ); 
 	}
}

/*
USAGE
node NodeServerCrud.js localhost 8071
node NodeServerCrud.js 192.168.137.1 8071
or run nodeServerActivator
*/