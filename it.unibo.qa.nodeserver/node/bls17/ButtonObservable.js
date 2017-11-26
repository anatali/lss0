/*
* =====================================
* ButtonObservable.js
* =====================================
*/
/*
 * ********************************************
 * Observable prototype
 * ********************************************
 */ 
Observable = function(){
	this.k = 0;
 	this.observerFunc = [ ];
 	this.observer     = [ ];
	this.register     = function(obs){
		//println("	Observable register " + this.k);
		this.observer[this.k++]  = obs;
	}
	this.registerFunc = function(func){
		//println("	Observable registerFunc " + this.k + " " + func);
		this.observerFunc[this.k++]  = func;
	}
	this.notify = function(){		
		for(var i=0;i < this.observer.length;i++){
			//println("	Observable update " + this.observer[i] );
			this.observer[i].update();
		}
		for(var i=0;i < this.observerFunc.length;i++){
			//println("	Observable calls " + this.observerFunc[i] );
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