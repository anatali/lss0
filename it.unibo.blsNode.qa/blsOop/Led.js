/*
* =====================================
* Led.js
* Led as a conventional 'object'
* ********************************************
*/
var Led = function(name, ledImpl){
	this.name      = name;
	this.ledImpl   = ledImpl;
	this.ledState  = 0;
	this.turnOff();
}
Led.prototype.turnOn  = function(){
	this.ledState = 1;
	this.ledImpl.turnOn();
}
Led.prototype.turnOff = function(){
	this.ledState = 0;
	this.ledImpl.turnOff();
}
Led.prototype.switchState = function(){
	this.ledState = (this.ledState + 1) % 2;
	if( this.ledState == 0 ) this.ledImpl.turnOff();
	else this.ledImpl.turnOn();
}
Led.prototype.getState = function(){
	return this.ledState;
}
Led.prototype.getName = function(){
	return this.name;
}
Led.prototype.getDefaultRep = function(){
	return  this.name+"||"+ this.ledState
}
// EXPORTS
module.exports.Led = Led;
//To work is a browser, do: browserify Led.js -o LedBro.js