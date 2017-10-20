/*
* =====================================
* TcpClientToQaNode.js
* =====================================
*/
var net  = require('net');
var host = process.argv[2];
var port = Number(process.argv[3]);		//23 for telnet

console.log('connect to ' + host + ":" + port);

var socket = net.connect({ port: port, host: host });
console.log('connect socket allowHalfOpen= ' + socket.allowHalfOpen );
socket.setEncoding('utf8');


// when receive data back, print to console
socket.on('data',function(data) {
	console.log(data);
});
// when server closed
socket.on('close',function() {
	console.log('connection is closed');
});
socket.on('end',function() {
	console.log('connection is ended');
});


process.on('exit', function(code){
	console.log("Exiting code= " + code );
});

//See https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
process.on('uncaughtException', function (err) {
cursor.reset().fg.red();
	console.error('got uncaught exception:', err.message);
cursor.reset();
	process.exit(1);		//MANDATORY!!!
});

//===============================================================

function sendMsg( msg ){
 	try{
 		socket.write(msg+"\n");
	}catch(e){ 
		console.log(" ------------------ EVENT    "  + e ); 
 	}
}
 
function sendMsgAfterTime( msg, time ){
	setTimeout(function(){ 
		//console.log("SENDING..." + msg  );
		sendMsg( msg ); }, 
		time);
}
 
sendMsgAfterTime("msg(info,dispatch,jsSource,qareceiver,info(ok1),1)", 200);
sendMsgAfterTime("msg(info,dispatch,jsSource,qareceiver,info(ok2),2)", 1000);
//sendMsgAfterTime("msg(alarm,event,jsSource,none,alarm(obstacle),3)", 700);
setTimeout(function(){ console.log("SOCKET END");socket.end(); }, 1500);

 



/*
----------------------------------------------
USAGE	(SERVER qa)
node TcpClientToQaNode.js localhost 8012
----------------------------------------------
*/