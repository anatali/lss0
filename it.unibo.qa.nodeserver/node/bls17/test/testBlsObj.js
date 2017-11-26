/*
 * testBlsObj.js for nodeunit
 */
//require("../blsUtils") ;
var LedMod    = require("../Led");
var ButtonMod = require("../Button");
var l1 = new LedMod.Led("l1",null);
var b1 = new ButtonMod.Button( 'b1', l1 );

exports.testInitial = function(test){
	var ledState = l1.getState();
	test.ok(   ! ledState, "initial");
 	test.done();
} 
exports.testTurnOn = function(test){
	l1.turnOn();
	test.ok( l1.getState(),  "turnOn");
 	test.done();
}
exports.testTurnOff=function(test){
	l1.turnOff();
	test.ok( ! l1.getState(),  "turnOff");
 	test.done();
}
exports.testTurnMany=function(test){
	test.expect(6);			//we expect 6 run
	for( i=1; i<=3; i++){
		l1.turnOn();
		test.ok( l1.getState(),  "turnOn");
		l1.turnOff();
		test.ok( ! l1.getState(),  "turnOff");		
	}
 	test.done();
}
exports.testButton=function(test){
	b1.press();
	test.ok( l1.getState(),  "button press");
	test.done();
}
 
