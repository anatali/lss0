/*
* =====================================
* blsButtonEmitter.js
* =====================================
*/
if( typeof document == "undefined" ){
	var ButtonMod = require("./ButtonEmitter");
	var LedMod    = require("./Led");
}

configure = function(name,ledGuiId){
	l1  = new LedMod.Led("l1",ledGuiId);
	b1  = new ButtonMod.Button( name  );
	b1.setHandler( function(msg){
		println("handler msg=" + msg +"  when led=" + l1.getState());
		l1.switchState();
	} );
}

/*
 * MAIN (for testing)
 */
function mainBlsButtonEmitter(){
	println(" ---- mainBlsButtonEmitter ---- ");
	configure( "b1", null );
	b1.press();
	l1.showGuiRep();
	b1.press();
	l1.showGuiRep();
}

if( typeof document == "undefined" ) {
	if( process.argv[1].toString().includes("blsButtonEmitter") ) mainBlsButtonEmitter();
}