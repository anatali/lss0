/*
* ================================================
* ButtonAsObservable.js
* GOAL:
* 	define a Button as a logical observable entity
*   that can call registered observers / functions
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
 * ********************************************
 * Button as an  'object'  that inherits from Observable
 * ********************************************
 */
//Specific
function Button ( name ){
	//Button Constructor: instance data
	this.name     = name; 
}

//Shared
Button.prototype             = new Observable();
//Button.prototype.constructor = Button;
Button.prototype.press = function(){
	this.notify();
}

//EXPORTS
if(typeof document == "undefined")  module.exports.Button = Button;	
