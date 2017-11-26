/*
* =====================================
* blsObjEmitter.js
* 
* =====================================
*/
var LedMod    = require("./Led");
var ButtonMod = require("./ButtonEmitter");

/*
 * A trick to wait for ms milleseconds anf finaly execute a callaback cb (if any)
 */
function waitFor(ms, callback) {
	  var waitTill = new Date(new Date().getTime() + ms);
	  while(waitTill > new Date()){};
	  if (callback)  callback(); else  return true
}
/*
 * APPLICATION
 */
var buttonAsObserver = true;
var eventCount = 0;

 
handler1 = function( evMsg ){
	println("	handler1  " + evMsg + " when led=" + l1.getState());
	l1.switchState();
	println(  l1.getDefaultRep() );
}
handler2 = function( evMsg ){
	println("	handler2 " + evMsg + " when led=" + l1.getState());
	waitFor(1000);
	println("	handler2  ENDS" );
}
/*
 * ********************************************
 * button --- event -->  handler --> led
 * ********************************************
 */
configure = function(){
  	b1    = new ButtonMod.Button('b1');
	l1    = new LedMod.Led("l1");
	/*
	 * We set two handlers to show that they are executed atomically
	 * The button pressed only when all the handlers are terminated
	 */
	b1.setHandler( handler1 );
	b1.emitter.on( "pressed", handler2 );
}

 
/*
 * -------------------------------------------------------
 * MAIN: 
 * 1) configure a system with one button and one led 
 * 2) press the button three times
 * -------------------------------------------------------
 */
mainBlsObjEmitter = function(){ 
	configure();
	for( var i=1; i<=3; i++){
		console.log("PRESS");
		b1.press();
	}
}
 
if( process.argv[1].toString().includes("blsObjEmitter") )  mainBlsObjEmitter();

/*
PRESS
        ButtonEmitter emits the event  pressed count=1
        handler1  buttonPressed when led=false
l1||true
        handler2 buttonPressed when led=true
        handler2  ENDS
PRESS
        ButtonEmitter emits the event  pressed count=2
        handler1  buttonPressed when led=true
l1||false
        handler2 buttonPressed when led=false
        handler2  ENDS
PRESS
        ButtonEmitter emits the event  pressed count=3
        handler1  buttonPressed when led=false
l1||true
        handler2 buttonPressed when led=true
        handler2  ENDS
 */ 