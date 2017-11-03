/*
* =====================================
* LedLiteral.js
* =====================================
*/
var led = {
		name:	 "led1" ,
		guiId:	 "ledGuiId", 
		ledState: false ,
//Methods 
turnOn:  function(){
	this.ledState = true;
},
turnOff:  function(){
	this.ledState = false;
},
switchState:  function(){
	this.ledState = ! this.ledState;
},
getState:  function(){
	return this.ledState;
},
getName:  function(){
	return this.name;
},
getDefaultRep:  function(){
	return  this.name+"||"+ this.ledState
},
showGuiRep:  function(){
	if( typeof document != "undefined"){
		if( this.ledState ) document.getElementById(this.guiId).style.backgroundColor='#00FF33';
		else document.getElementById(this.guiId).style.backgroundColor='#FF0000';			
	}		
	println( this.getDefaultRep() );
}, //trailing comma

};//led 

/*
 * UTILITIES
 */
function showMsg(outView, txt){	
	if( txt == null ){
		document.getElementById(outView).innerHTML="<font size='5' color='blue'><pre><br/></pre></font>";
		return;
	}
	cc = document.getElementById(outView).innerHTML;	//current value to be accumulated
 	cc = cc.replace('<font size="5" color="blue"><pre>',"");	//DO NOT CHANGE !!!
 	cc = cc.replace("</pre></font>","");
    document.getElementById(outView).innerHTML="<font size='5' color='blue'><pre>"+cc +   txt+ "</pre></font>";    
}
println = function ( v ){
	try{
		if( typeof document != "undefined" ) showMsg( 'outView', v+"<br/>" );
		else console.log( v );
	}catch(e){
		console.log( v );
	}
}
//EXPORTS
if(typeof document == "undefined") module.exports.led = led;	 
