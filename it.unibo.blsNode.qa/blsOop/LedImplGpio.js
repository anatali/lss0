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
	this.ledState  = 0;
}

LedImplGpio.prototype.turnOn  = function(){
	this.ledState = 1;
	this.ledGpio.writeSync(1);
}
LedImplGpio.prototype.turnOff = function(){
	this.ledState = 0;
	this.ledGpio.writeSync(0);
}
 

// EXPORTS
if(typeof document == "undefined") module.exports.LedImplGpio = LedImplGpio;
 