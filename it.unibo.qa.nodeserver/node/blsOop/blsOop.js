/*
 * ======================================================
 * blsOop.js
 * VISION:
 * 	 A logic architecture should guide any software development
 * GOAL : 
 * 	1) build a prototype working on a pc
 *  2) test the prototype on the pc
 *  3) refactor (extend) the code so to work on a RaspberryPi 
 * ======================================================
*/
var ButtonHL = require("./ButtonObservable");
var LedHL    = require("./Led");
/*
 * ----------------------------------------------------
 * BUTTON HIGH-level  
 * ----------------------------------------------------
 */
var button   = new ButtonHL.Button( "b1" );
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
 	
//	button.registerFunc( function(){ l1rasp.switchState();	}); 		//callback
//Set an interrupt handler that calls the business logic
 buttonGpio.watch(function (err, level) {
	  if (err) {    throw err;   }
	  //console.log('Interrupt level=' + level + " on " + button);
	  if( level == 1 ) button.press(level);  //activates the observers
  });
  //Set another event handler (for the HL button as an emitter)
  button.getEmitter().on( button.evId, function(v){console.log("	%%% HL RASP event handler: event content=" + v); } )
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
	button.setHandler( 
		function(msg){
			console.log("	configureForPc handler msg=" + msg +"  when led=" + l1.getState());
			l1.switchState();
	} );
	 //Set another event handler (for the HL button as an emitter)
	button.getEmitter().on( button.evId, 
		function(v){console.log("	%%% HL PC event handler: event content=" + v); } )
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
//RAPID CHECK (working also on a RaspberryPi)
for( i=1; i<=5; i++ ) button.press();
console.log('blsOop ENDS'  );

//EXPORTS
if(typeof document == "undefined")  module.exports.button = button;	 //USED BY HttpServerBls.js
