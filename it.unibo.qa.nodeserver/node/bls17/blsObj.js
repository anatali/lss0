/*
* =====================================
* blsObj.js
* =====================================
*/
if( typeof document == "undefined" ){
	var ButtonMod = require("./Button");
	var LedMod    = require("./Led");
//	require("../blsUtils")
}

/*
CONFIGURATION
*/
configure = function(name,ledGuiId){
	l1 = new LedMod.Led("l1",ledGuiId);
	return new ButtonMod.Button( name, l1 );
}

/*
 * MAIN (for testing)
 */
function mainBlsObj(){
	println(" ---- mainBlsObj ---- ");
	b1 = configure("b1", "");
	b1.press();
	b1.press();
}

if( typeof document == "undefined" ) {
	if( process.argv[1].toString().includes("blsObj") ) mainBlsObj();
}

