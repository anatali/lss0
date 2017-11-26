/*
* =====================================
* Led.js
* =====================================
*/
  
/*
 * ********************************************
 * Led as a conventional 'object'
 * ********************************************
 */
//State (specific)
var Led = function(name, guiId){
	//Led Constructor: instance data
	this.name      = name;
	this.guiId     = guiId;
	this.ledState  = false;
}

//Methods (shared)
Led.prototype.turnOn  = function(){
	this.ledState = true;
}
Led.prototype.turnOff = function(){
	this.ledState = false;
	}
Led.prototype.switchState = function(){
	this.ledState = ! this.ledState;
	}
Led.prototype.getState = function(){
	return this.ledState;
}
Led.prototype.getName = function(){
	return this.name;
}
Led.prototype.getDefaultRep = function(){
	return  this.name+"||"+ this.ledState
}
Led.prototype.showGuiRep = function(){
 	if( typeof document != "undefined"){
		if( this.ledState ) document.getElementById(this.guiId).style.backgroundColor='#00FF33';
		else document.getElementById(this.guiId).style.backgroundColor='#FF0000';			
	}		
 	else println( this.getDefaultRep() );
}

println = function ( v ){
	try{
		if( typeof document != "undefined" ) showMsg( 'outView', v+"<br/>" );
		else console.log( v );
	}catch(e){
		console.log( v );
	}
}
// EXPORTS
if(typeof document == "undefined") module.exports.Led = Led;
//To work is a browser, do: browserify Led.js -o LedBro.js