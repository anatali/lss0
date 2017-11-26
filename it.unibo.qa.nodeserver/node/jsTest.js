
var f = function(){ console.log("1000a1"); console.log("1000a2");  }

setTimeout( f, 1000 );
setTimeout( f, 1000 );
setTimeout( f, 1000 );


console.log( f );
//f();

