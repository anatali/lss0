 /*
  * blsUtils.js
  */
function showCode(file){
    if( file  == null ) document.getElementById('code').innerHTML="";
    else document.getElementById('code').innerHTML="<iframe width='900' height='600' src="+code+"></iframe>";    
}
function showLocalCode(code){
	var outS = ""+code;
     document.getElementById('code').innerHTML=" <pre>"+ outS + "</pre> ";    
}
function cleanOut(){
 	showCode(null);
 	showMsg('outView', null);
}
function loadWithMsg(msg, file){
	//cleanOut();
    if( msg.length > 0 ) showMsg( 'outView', msg );
    document.getElementById('code').innerHTML="<iframe width='900' height='600' src="+file+"></iframe>";    
}
function showMsg(outView, txt){	
	if( txt == null ){
		document.getElementById(outView).innerHTML="<font size='5' color='blue'><pre><br/></pre></font>";
		return;
	}
	cc = document.getElementById(outView).innerHTML;	//current value to be accumulated
 	cc = cc.replace('<font size="5" color="blue"><pre>',"");	//DO NOT CHANGE !!!
 	cc = cc.replace("</pre></font>","");
	//console.log(cc);
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

function waitFor(ms, cb) {
	  var waitTill = new Date(new Date().getTime() + ms);
	  while(waitTill > new Date()){};
	  if (cb) {
	    cb()
	  } else {
	   return true
	  }
}
