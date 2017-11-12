/*
* =====================================
* LedImplGpio.js
* 
* Led implmentation on a RaspberryPi
* =====================================
*/
var onoff = require('onoff'); 
var Gpio  = onoff.Gpio;
var LedHL = require("./Led");

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
 




test = function(){
	var ledRasp = new LedImplGpio("led1", 6);	//6 wpi is 25 BCM
	var led     = new LedHL.Led("led1",ledRasp);
	console.log("led=" + led.getDefaultRep() );
	for( i=1; i<=5; i++){
 		setTimeout( led.turnOn, 500*i );
 		setTimeout( led.turnOff, 1000*i );
	}
}
test();
// EXPORTS
if(typeof document == "undefined") module.exports.LedImplGpio = LedImplGpio;
 