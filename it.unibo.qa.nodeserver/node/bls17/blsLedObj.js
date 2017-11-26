/*
* =====================================
* blsLedObj.js
* =====================================
*/
var ledMod = require("./Led");

var buttonPress = function(led){
	led.switchState();
	led.showGuiRep();
}
/*
 * MAIN (for testing)
 */
function mainBlsLedObj(){
	println(" ---- mainBlsLedObj ---- ");
	l1= new ledMod.Led('l1', null);
	l1.turnOn();
	l1.showGuiRep();
	l1.turnOff();
	l1.showGuiRep();
}

if( process.argv[1].toString().includes("blsLedObj") ) mainBlsLedObj();
