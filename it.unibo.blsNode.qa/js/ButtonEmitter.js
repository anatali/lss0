/*
* =====================================
* ButtonEmitter.js
* =====================================
*/
var EventEmitter = require('events').EventEmitter;
/*
 * ********************************************
 * Button as an emitter of events
 * ********************************************
 */
Button  = function ( name ){
	this.emitter  = new EventEmitter();
	this.name     = name;
	this.evId     = "pressed";
	this.count    = 1;
}
Button.prototype.emitEvent = function(){
	println("	ButtonEmitter emits the event  "  +  this.evId  + " count=" + this.count++);
	this.emitter.emit(this.evId,'buttonPressed') ;
}
Button.prototype.getEmitter = function(){
	return this.emitter;
}
Button.prototype.setHandler = function( handler ){
 	this.emitter.on(this.evId, handler  );
}
Button.prototype.removeHandler = function( handler ){
 	this.emitter.removeAllListeners(this.evId);
}
Button.prototype.press = function(){
  	this.emitEvent() ;
}

if(typeof document == "undefined") module.exports.Button = Button 
//To work is a browser, do: browserify ButtonEmitter.js -o ButtonEmitterBro.js
