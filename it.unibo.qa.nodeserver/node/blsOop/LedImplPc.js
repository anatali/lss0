/*
* =====================================
* LedImplPc.js
* Led implementation on a PC
* =====================================
*/
var LedImplPc  = function( name ){
	this.name      = name;
	this.ledState  = 0;
}
LedImplPc.prototype.turnOn  = function(){
	this.ledState  = 1;
	console.log("LED " + this.name + " ON");
}
LedImplPc.prototype.turnOff = function(){
	this.ledState = 0;
	console.log("LED " + this.name + " OFF");
}
// EXPORTS
if(typeof document == "undefined") module.exports.LedImplPc = LedImplPc;
 