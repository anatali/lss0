/*
 * testBlsObservableObj.js for nodeunit
 */
var LedMod    = require("../Led");
var ButtonMod = require("../ButtonObservable");

var l1 = new LedMod.Led("l1",null);
var b1 = new ButtonMod.Button( 'b1' );

exports.testObservableButton=function(test){
	test.expect(3);			//we expect 3 run
	test.ok(   ! l1.getState(), "testObservableButton initial");
	b1.registerFunc( 
			function(){ l1.switchState();	});
	b1.press();
	test.ok(  l1.getState(),  "testObservableButton press 1");
	b1.press();
	test.ok(  ! l1.getState(),  "testObservableButton press 2");
	test.done();
} 