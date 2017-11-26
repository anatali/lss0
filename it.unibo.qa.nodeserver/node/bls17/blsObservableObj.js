/*
* =====================================
* blsObservableObj.js
* =====================================
*/
if( typeof document == "undefined" ){
	var ButtonMod = require("./ButtonObservable");
	var LedMod    = require("./Led");
}

/*
CONFIGURATION
*/
configure = function(name,ledGuiId){
	l1    = new LedMod.Led("l1",ledGuiId);
	b1    = new ButtonMod.Button( name  );
	b1.registerFunc( 
		function(){ l1.switchState();	}); 		//callback
}
/*
 * MAIN (for testing)
 */
function mainBlsObservableObj(){
	println(" ---- mainBlsObservableObj ---- ");
	configure("b1", null );
	b1.press();
	l1.showGuiRep();
	b1.press();
	l1.showGuiRep();
}

if( typeof document == "undefined" ) {
	if( process.argv[1].toString().includes("blsObservableObj") ) mainBlsObservableObj();
}

 