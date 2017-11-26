/*
 * ======================================================
 * it.unibo.qa.nodeserver/node/blsOop/LedHlRasp.js
 * VISION:
 * 	 A led is a logical device with an implementation
 * ======================================================
*/
var LedHL      = require("./Led");
var LedOnRasp  = require("./LedImplGpio");
var l1rasp     = new LedOnRasp.LedImplGpio("l1rasp", 25);	
var l1         = new LedHL.Led("l1rasp", l1rasp); 

doSwitch = function(){
	l1.switchState();
}
getLedState = function(){
	l1.getState();
}


//prepare for input from terminal
process.stdin.resume();
// when receive data do ...
process.stdin.on('data', function (data) {
	console.log("		input=" + data);
	l1.switchState();
});


test = function(){
	for( i=1; i<=4; i++){
 	    setTimeout( l1.switchState.bind(l1),  500*i );
 	}	
}
test();

 
