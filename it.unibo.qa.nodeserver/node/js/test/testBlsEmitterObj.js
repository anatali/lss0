/*
 * testBlsEmitterObj.js 
 * USAGE: nodeunit testBlsEmitterObj.js
 */
var LedMod    = require("../Led");
var ButtonMod = require("../ButtonEmitter");

var l1 = new LedMod.Led("l1",null);
var b1 = new ButtonMod.Button( 'b1' );

/*
	It is possible to have multiple groups of tests in a module, 
	each group with its own setUp and tearDown functions
*/
module.exports = {
	    setUp: function (callback) { 
	    	l1.turnOff();
	    	b1.setHandler( function( evMsg ){ 
	    		console.log("		event handler:  evMsg="+ evMsg); 
	    		l1.switchState();} 
	    	);
	    	b1.emitter.on( b1.evId, function( evMsg ){ 
	    		console.log("		log:"+ evMsg); 
	    	});
	    	console.log("SETUP" );
	        callback();
	    },
	    tearDown: function (callback) {
	    	console.log("TEARDOWN" );
	        // clean up
	    	b1.removeHandler();
	        callback();
	    },
	    testEmitterButton : function(test){
	    	test.ok(   ! l1.getState(), "testEmitterButton initial");
	    	console.log("PRESS");
	    	b1.press();
	    	test.ok(  l1.getState(),  "testEmitterButton press 1");
	    	console.log("PRESS");
	    	b1.press();
	    	test.ok(  ! l1.getState(),  "testEmitterButton press 2");
	    	test.done();
		},
		testEmitterButtonAgain : function(test){
			test.ok(   ! l1.getState(), "testEmitterButton initial");
			console.log("PRESS AGAIN "  );
			b1.press();
 			test.ok(  l1.getState(),  "testEmitterButton press 1");
			console.log("PRESS AGAIN");
			b1.press();
			test.ok(  ! l1.getState(),  "testEmitterButton press 2");
 			test.done();
		} 
};
