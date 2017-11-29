/*
 * ======================================================
 * it.unibo.qa.nodeserver/node/blsOop/LedHlPc.js
 * VISION:
 * 	 A led is a logical device with an implementation
 * ======================================================
*/
var LedHL    = require("./Led");
var LedOnPc  = require("./LedImplPc");
var l1pc     = new LedOnPc.LedImplPc("l1pc");	
var l1       = new LedHL.Led("l1pc",l1pc); 

var path    = require('path');
var file    = path.join(process.cwd(), './cmd.txt'); //in src when called from qa

doSwitch = function(){
//	console.log("LED SWITCH before:"+ l1.getState());
	l1.switchState();
//	console.log("LED SWITCH after: "+ l1.getState());
}
getLedState = function(){
	l1.getState();
}

//prepare for input from terminal
process.stdin.resume();
// when receive data do ...
process.stdin.on('data', function (data) { 
	//console.log("		input=" + data);	 
	l1.switchState();
	//storeData(file, "after switch:"+l1.getState());
});

//doSwitch();
