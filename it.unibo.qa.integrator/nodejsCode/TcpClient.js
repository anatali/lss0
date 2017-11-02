/*
* =====================================
* TcpClient.js
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
