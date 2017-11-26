/*
 * testBlsLedObjLiteral.js for nodeunit
 */
/*
 * The test function accepts one argument, which is the test object. 
 * The test object contains all the assert module methods plus two new methods: 
 * 'expect' and 'done'. 
 * Expect can be used to tell nodeunit how many assertions you expect to run, 
 * and the done function tells nodeunit that the test has completed. 
 */ 
var ledMod  = require("../LedLiteral");

var l1 = ledMod.led;

exports.testLedInitial = function(test){
	var ledState = l1.getState();
	test.ok(   ! ledState, "initial");
 	test.done();
} 
exports.testLedTurnOn = function(test){
	l1.turnOn();
	test.ok( l1.getState(),  "turnOn");
 	test.done();
}
exports.testLedTurnOff=function(test){
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
 
 
