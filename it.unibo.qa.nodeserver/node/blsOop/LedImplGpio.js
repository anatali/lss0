/*
* =====================================
* LedImplGpio.js
* 
* Led implmentation on a RaspberryPi
* =====================================
*/
var onoff = require('onoff'); 
var Gpio  = onoff.Gpio;

var LedImplGpio = function(name,ledpin){
	this.name      = name;
	this.ledGpio   = new Gpio(ledpin, 'out'); 
	console.log("LedImplGpio STARTED on GPIO=" + ledpin);
}

LedImplGpio.prototype.turnOn  = function(){
	this.ledGpio.writeSync(1);
}
LedImplGpio.prototype.turnOff = function(){
	this.ledGpio.writeSync(0);
}
 

// EXPORTS
if(typeof document == "undefined") module.exports.LedImplGpio = LedImplGpio;
 