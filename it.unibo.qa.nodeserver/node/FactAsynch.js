/*
* =====================================
* FactAsynch.js
* =====================================
*/
factAsynch = function( n,  callback ){
	factIterAsynch(n,n,1,callback);
} 
factIterAsynch = function( n, n0, v, callback ){
	var res = n*v;	//ACCUMULATOR
	console.log( "factIterAsynch n0=" + n0 + " n=" + n, " v=" + v + " res=" + res);
 	if( n == 1 ) callback( "factIterAsynch(" + n0 + ") RESULT="+res );
 	else setTimeout( 
 			function(){  
 				factIterAsynch(n-1, n0, res, callback) ; } , 0 );
 }

console.log("START");
console.log("CALL= " + factAsynch(4, console.log) );
factAsynch(6,console.log);
console.log("END");

/*
START
factIterAsynch n0=4 n=4  v=1 res=4
CALL=  undefined
factIterAsynch n0=6 n=6  v=1 res=6
END
factIterAsynch n0=4 n=3  v=4 res=12
factIterAsynch n0=6 n=5  v=6 res=30
factIterAsynch n0=4 n=2  v=12 res=24
factIterAsynch n0=6 n=4  v=30 res=120
factIterAsynch n0=4 n=1  v=24 res=24
factIterAsynch(4) RESULT=24
factIterAsynch n0=6 n=3  v=120 res=360
factIterAsynch n0=6 n=2  v=360 res=720
factIterAsynch n0=6 n=1  v=720 res=720
factIterAsynch(6) RESULT=720
*/

