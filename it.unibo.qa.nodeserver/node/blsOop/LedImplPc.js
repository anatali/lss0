/*
* =====================================
* LedImplPc.js
* Led implementation on a PC
* =====================================
*/
var path    = require('path');
var file    = path.join(process.cwd(), './cmd.txt'); //in src when called from qa


var LedImplPc  = function( name ){
	this.name      = name;
	this.ledState  = 0;
}
LedImplPc.prototype.turnOn  = function(){
	this.ledState  = 1;
	storeData(file, "		LedImplPc after turnOn:"+ this.ledState);
	//console.log("LED " + this.name + " ON");
}
LedImplPc.prototype.turnOff = function(){
	this.ledState = 0;
	storeData(file, "		LedImplPc after turnOff:"+ this.ledState);
	//console.log("LED " + this.name + " OFF");
}
// EXPORTS
if(typeof document == "undefined") module.exports.LedImplPc = LedImplPc;

//----------------------------------------------------------
var fs   = require('fs');
var path = require('path');
var file = path.join(process.cwd(), './cmd.txt')

function storeData(file, newData) {
  fs.writeFile(file, newData, 'utf8', function(err) {
    if (err) throw err;
//    console.log('		Saved: ' + newData);
  });
}
//----------------------------------------------------------

storeData(file, "LedImplPc STARTED ");
