/*
 * =====================================
 * gpioOnOffbutton.js
 * See https://github.com/fivdi/onoff
 * =====================================
*/
var onoff = require( 'onoff' );
var Gpio      = onoff.Gpio;
var buttonPin = 24;
var ledPin    = 25;

var button = new Gpio(buttonPin, 'in', 'both');
var led    = new Gpio(ledPin, 'out');

/*
Watch for hardware interrupts on the GPIO. 
The edge argument that was passed to the constructor 
determines which hardware interrupts to watch for.
*/
button.watch(function (err, level) {
  if (err) {
    throw err;
  }
  console.log('Interrupt level =' + level);
  led.writeSync(level);
});

//Read GPIO value asynchronously.
button.read( function(value){
   console.log('read value= ' + value);
});

process.on('SIGINT', function () {  
  led.writeSync(0);  
  led.unexport();
  button.unexport();
  console.log('Bye, bye!');
  process.exit();
});

//========================================================
function showButton() {
    console.log("button=" + button.readSync() );
}

for( i=1; i<=10; i++){
    setTimeout(showButton, 1000*i);
}

console.log('Waiting for clicks on pin=' + buttonPin);