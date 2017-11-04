/*
 * ========================================================
 * testPCBlsObservableObj.js for nodeunit
 * project it.unibo.bls2016.qa
 * USAGE: nodeunit testBlsObservableObj.js
 * ========================================================
 */
var LedHL    = require("./Led");
var ButtonHL = require("./ButtonObservable");

configureForPc = function(){
	var LedOnPc   = require("./LedImplPc");
	var l1pc      = new LedOnPc.LedImplPc("l1pc"); //a mock object
	//Global variables
	b1  = new ButtonHL.Button( 'b1' );
	l1  = new LedHL.Led("l1pc",l1pc); 
//handler of the event 'pressed' emitted by the button
	b1.setHandler( 
		function(msg){
			console.log("	handler msg=" + msg +"  when led=" + l1.getState());
			l1.switchState();
	} );
	//Set another event handler (for the HL button as an emitter)
	b1.getEmitter().on( b1.evId, function(v){console.log("	%%% HL PC event handler: event content=" + v); } )
}
exports.testObservableButton=function(test){
	configureForPc();
	test.expect(3);			//we expect 3 run
	test.ok( l1.getState() == 0, "testObservableButton initial");
	b1.press();
	test.ok(  l1.getState() == 1,  "testObservableButton press 1");
	b1.press();
	test.ok(  l1.getState() == 0,  "testObservableButton press 2");
	test.done();
} 