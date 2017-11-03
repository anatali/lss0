/*
 * =====================================
 * ledGpio.js
 * =====================================
 */
// (1) Import the onoff library
// (2) Initialize pin 25 to be an output pin
// (3) This interval will be called every 2 seconds
// (4) Synchronously read the value of pin 25 and transform 1 to 0 or 0 to 1
// (5) Asynchronously write the new value to pin 25
// (6) Listen to the event triggered on CTRL+C
// (7) Cleanly close the GPIO pin before exiting

var onoff = require('onoff'); 			//(1)

var Gpio = onoff.Gpio;
var led  = new Gpio(25, 'out'); 		//(2)


interval = setInterval(function () { 	//(3)
  var value = (led.readSync() + 1) % 2; //(4)
  led.write(value, function() { 		//(5)
    console.log("Changed LED state to: " + value);
  });
}, 500);

process.on('SIGINT', function () { 		//(6)
  clearInterval(interval);
  led.writeSync(0); 					//(7)
  led.unexport();
  console.log('Bye, bye!');
  process.exit();
});

interval;