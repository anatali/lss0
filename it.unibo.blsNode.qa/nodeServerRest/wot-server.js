// Final version
var 
  httpServer = require('./servers/http'),
  wsServer   = require('./servers/websockets'),
  resources  = require('./resources/model');

// Internal Plugins
var 
  ledsPlugin = require('./plugins/internal/ledsPlugin'), //#A
  pirPlugin  = require('./plugins/internal/pirPlugin'), //#A
  dhtPlugin  = require('./plugins/internal/DHT22SensorPlugin'); //#A

// Internal Plugins for sensors/actuators connected to the PI GPIOs
// If you test this with real sensors do not forget to set simulate to 'false'
//pirPlugin.start({'simulate': true, 'frequency': 2000}); //#B
//ledsPlugin.start({'simulate': true, 'frequency': 3000}); //#B
dhtPlugin.start({'simulate': true, 'frequency': 10000}); //#B

// External Plugins
var coapPlugin = require('./plugins/external/coapPlugin');
//coapPlugin.start({'simulate': false, 'frequency': 2000});

// HTTP Server
var server = httpServer.listen(resources.pi.port, function () {
  console.log('HTTP server started...');

  // Websockets server
  wsServer.listen(server);

  console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
//#A Require all the sensor plugins you need
//#B Start them with a parameter object; here you start them on a laptop so you activate the simulation function



/*
 // Initial version:
 var httpServer = require('./servers/http'), //#A
 resources = require('./resources/model');

 var server = httpServer.listen(resources.pi.port, function () { //#B
  console.info('Your WoT Pi is up and running on port %s', resources.pi.port); //#C
 });

 //#A Load the http server and the model
 //#B Start the HTTP server by invoking listen() on the Express application
 //#C Once the server is started the callback is invoked
 */


//==============================================================
process.on('exit', function(code){
	console.log("Exiting code= " + code );
});

//See https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
process.on('uncaughtException', function (err) {
	console.error('wot-server got uncaught exception:', err.message);
	//process.exit(1);		//MANDATORY!!!
});






/*
================================================================
USAGE:
http://localhost:8484/pi/sensors/temperature
http://localhost:8484/pi/actuators
http://localhost:8484/pi/actuators/leds
http://localhost:8484/pi/actuators/leds/1
http://localhost:8484/pi/sensors/humidity


POSTMAN:
http://localhost:8484/pi/actuators/leds/1?value=true

curl -v localhost:8484/pi/sensors/pir
curl -i -H "Accept: application/json" -X GET  http://localhost:8484/pi/sensors/temperature 
curl -v -i -H "Accept: text/html" -X GET  http://localhost:8484/pi/sensors/pir 

curl -i -H 'Accept: application/json' -X GET  http://localhost:8484/things/coapDevice/sensors/co2

curl -i -H "Content-Type: application/json" \
-H "Accept: application/json" \
-X PUT 'http://localhost:8484/pi/actuators/leds/1' \
-d '{"value":true}'


By default cURL uses Content-Type: application/x-www-form-urlencoded for form submissions that do not contain files.
For JSON, you'd have to explicitly set the right Content-Type: 
curl -H "Content-Type: application/json" -d '{"foo":"bar","baz":"bla"}' http://127.0.0.1:3000/module.

curl -i  -H "Accept: application/json" -X PUT http://localhost:8484/pi/actuators/leds/1 -d '{"value":true}'
curl -i  -H "Content-Type: application/json" -X PUT http://localhost:8484/pi/actuators/leds/1 -d {"value":true}

curl -i -X GET http://localhost:8484/pi/actuators/leds/1

curl -i -X GET http://rest-api.io/items
curl -i -X GET http://rest-api.io/items/5069b47aa892630aae059584
curl -i -X DELETE http://rest-api.io/items/5069b47aa892630aae059584
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New item", "year": "2009"}' http://rest-api.io/items
curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "Updated item", "year": "2010"}' http://rest-api.io/items/5069b47aa892630aae0595



WORKING
%%% curl -i -H 'Content-Type: html' -X GET  http://localhost:8484/pi/sensors/temperature
%%% curl -i -X PUT -H 'Content-Type: application/json' -d '{"value": true}' http://localhost:8484/pi/actuators/leds/1 
curl -i -X GET -H 'Content-Type: application/json' http://localhost:8484/pi/actuators/leds/1 
curl -i -X PUT -H 'Content-Type: application/json' -d '{"name":"LED 1","value":true,"gpio":4}' http://localhost:8484/pi/actuators/leds/1 


================================================================

*/