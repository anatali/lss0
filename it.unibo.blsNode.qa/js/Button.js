/*
* =====================================
* Button.js
* =====================================
*/
/*
 * ********************************************
 * Button as a conventional 'object'  
 * ********************************************
 */
//Specific
function Button ( name, led ){
	//Button Constructor: instance data
	this.name     = name;
	this.led      = led;	
}

//Shared
Button.prototype.press = function(){
  	this.led.switchState();
	this.led.showGuiRep();
}
  
//EXPORTS
if(typeof document == "undefined") module.exports.Button = Button;	 