/*
* ================================================
* ButtonObservable.js
* GOAL:
* 	define a Button as a logical observable entity
*   that can call registered observers / functions
*   and that can rise (NodeJs) events
* ================================================
*/
/*
 * ********************************************
 * Observable prototype
 * ********************************************
 */ 
Observable = function(){
	this.nobs         = 0;
	this.nobsfunc     = 0;
 	this.observerFunc = [ ];
 	this.observer     = [ ];
	this.register     = function(obs){
		//println("	Observable register " + this.nobs);
		this.observer[this.nobs++]  = obs;
	}
	this.registerFunc = function(func){
		//println("	Observable registerFunc " + this.nobs + " " + func);
		this.observerFunc[this.nobsfunc++]  = func;
	}
	this.notify = function(){				
		for(var i=0;i < this.observer.length;i++){
			//console.log("	Observable update " + this.observer[i] );
			this.observer[i].update();
		}
		for(var i=0;i < this.observerFunc.length;i++){
			//console.log("	Observable calls " + this.observerFunc[i] );
 			this.observerFunc[i]();
		}
	}
  }
/*
 * ***********************************************************
 * Button as an  'object'  that inherits from Observable
 * and works also as an event emitter.
 * ***********************************************************
 */
var EventEmitter = require('events').EventEmitter;

function Button ( name ){
	this.emitter  = new EventEmitter();
	this.name     = name; 
	this.evId     = "pressed";
	this.count    = 0;
}

//Shared
Button.prototype       = new Observable();
Button.prototype.press = function(level){
	//console.log("	Button press " + level );
	this.notify();
	this.emitEvent() ;
}
Button.prototype.emitEvent = function(){
	console.log("	Button emits "  +  this.evId  + " count=" + this.count++);
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
 

//EXPORTS
module.exports.Button = Button;	 
//To work is a browser, run: browserify ButtonObservable.js -o ButtonObservableBro.js