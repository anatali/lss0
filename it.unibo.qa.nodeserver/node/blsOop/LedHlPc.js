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
	storeData(file, data);
	l1.switchState();
});

//----------------------------------------------------------
var fs   = require('fs');
var path = require('path');
var file = path.join(process.cwd(), './cmd.txt')

function storeData(file, newData) {
  fs.writeFile(file, newData, 'utf8', function(err) {
    if (err) throw err;
    console.log('		Saved: ' + newData);
  });
}
//----------------------------------------------------------

console.log("LedHL STARTED ");
//doSwitch();
