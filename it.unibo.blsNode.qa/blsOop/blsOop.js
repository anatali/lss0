/*
 * ======================================================
 * blsOop.js
 * 
 * VISION:
 * 	 A logic architecture should guide any software development
 * GOAL : 
 * 	1) build a prototype working on a pc
 *  2) test the prototype on the pc
 *  3) refactor (extend) the code so to work on a RaspberryPi 
 * ======================================================
*/
var ButtonHL = require("../js/ButtonObservable");
var LedHL    = require("../js/Led");
/*
 * ----------------------------------------------------
 * BUTTON HIGH-level  
 * ----------------------------------------------------
 */
var b1   = new ButtonHL.Button( "b1"  );

/*
 * ----------------------------------
 * CONFIGURATION ON RASPBERRYPI
 * ----------------------------------
*/
configureForRasp = function(){
	var LedOnRasp  = require("./LedImplGpio");
	var onoff      = require( 'onoff' );
	var Gpio       = onoff.Gpio;
	var l1gpio     = new LedOnRasp.LedImplGpio("l1rasp", 25);
	var buttonGpio = new Gpio(24, 'in', 'both');
 	var l1rasp     = new LedHL.Led("l1rasp",l1gpio); 
 	
//	b1.registerFunc( function(){ l1rasp.switchState();	}); 		//callback
//Set an interrupt handler that calls the business logic
 buttonGpio.watch(function (err, level) {
	  if (err) {    throw err;   }
	  //console.log('Interrupt level=' + level + " on " + b1);
	  if( level == 1 ) b1.press(level);  //activates the observers
  });
  //Set another event handler (for the HL button as an emitter)
  b1.getEmitter().on( b1.evId, function(v){console.log("	%%% HL RASP event handler: event content=" + v); } )
}
/*
 * ----------------------------------
 * CONFIGURATION ON PC
 * ----------------------------------
*/
configureForPc = function(){
	var LedOnPc   = require("./LedImplPc");
	var l1pc      = new LedOnPc.LedImplPc("l1pc");
	
	l1            = new LedHL.Led("l1pc",l1pc); 
	/*
	 * handler of the event 'pressed' emitted by the button
	 */
	b1.setHandler( 
		function(msg){
			console.log("	configureForPc handler msg=" + msg +"  when led=" + l1.getState());
			l1.switchState();
	} );
	 //Set another event handler (for the HL button as an emitter)
	b1.getEmitter().on( b1.evId, function(v){console.log("	%%% HL PC event handler: event content=" + v); } )

}

/* 
 * CTRL-C handling
 */
process.on('SIGINT', function () {  
  ledGpio.writeSync(0);  
  ledGpio.unexport();
  buttonGpio.unexport();
  console.log('Bye, bye!');
  process.exit();
});

//Main
console.log('blsOop STARTS'  );
configureForPc();
//configureForRasp();  
console.log('blsOop ENDS'  );
//RAPID CHECK (working also on a RaspberryPi)
for( i=1; i<=5; i++ ) b1.press();


//EXPORTS
if(typeof document == "undefined")  module.exports.b1 = b1;	 //USED BY HttpServerBls.js
