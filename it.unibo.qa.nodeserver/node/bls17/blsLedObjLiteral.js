/*
* =====================================
* blsLedObjLiteral.js
* =====================================
*/
if( typeof document == "undefined" ){
 	ledMod = require("./LedLiteral");
}

var led = ledMod.led;

var buttonPress = function(){
	led.switchState();
	led.showGuiRep();
}

/*
 * MAIN (for testing)
 */
function mainBlsLedObjLiteral(){
	println(" ---- mainBlsLedObjLiteral ---- ");
	led.turnOn();
	led.showGuiRep();
	led.turnOff();
	led.showGuiRep();
}

if( typeof document == "undefined" ) {
	if( process.argv[1].toString().includes("blsLedObjLiteral") ) mainBlsLedObjLiteral();
}