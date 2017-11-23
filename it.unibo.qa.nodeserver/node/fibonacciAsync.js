/*
* =====================================
* fibonacciAsync.js
* =====================================
*/
fibonacciAsync  = function( logo, n, callback ){
 	if( n==1  || n == 2 || n == 3 ) {   callback( n  ); }
	else{
 			console.log( "fibonacciAsync " + logo + " for " + n   );
/*1*/		process.nextTick( 
/*1f*/				function() {
/*2*/			        fibonacciAsync( logo, n-1 , 
/*2f*/				        function(val1){
	
/*3*/					            	process.nextTick( 
/*3f*/						            	function() {
/*4*/							                    fibonacciAsync( logo, n-2, 
/*4f*/							                    	function(val2){
								                     		callback(  val1 + val2  );
								                    	}/*4f*/
							                    );/*4*/
						            		}/*3f*/
					            		);/*3*/
			            	
							}/*2f*/
			            )/*2*/;
				}/*1f*/
		);/*1*/
    }}


function activate(){
	console.log("activateSequential  STARTS ");
	fibonacciAsync( "first", 8,  console.log);  
	fibonacciAsync( "second", 8, console.log);  
	console.log("activateSequential  ENDS ");	
}
 
activate();

//browserify fibonacci.js -o fibonacciBro.js
// 1 2 3 4 5 6 	7   8   9   10  11		15		20		25		30			40				45
// 1 2 3 5 8 13 21  34  55  89  144		987		10946	121393	1346269		165580141		1836311903
