var resources  = require('./../../resources/model');
var observable = require('./../../nat/observableFactory'); 	//by AN
var sendMsg    = require('./../../nat/TcpClientToQaNode'); 	//by AN

var actuator, interval;
var model       = resources.pi.actuators.leds['1'];
var pluginName  = model.name;
var localParams = {'simulate': false, 'frequency': 2000};

//console.log("	"+observable); 	//by AN

exports.start = function (params) {
  localParams = params;
  observe(model); //#A

  if (localParams.simulate) {
    //simulate();		//by AN: we do not simulate any LED change
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    actuator.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function observe(what) {
	console.info('plugin observe: ' + localParams.frequency  );
 	console.info( what);
 
	console.info('plugin observe: ' + localParams.frequency + " CHANGE MDOEL INTO OBSERVABLE");
//Change the model into an observable	
const whatObservale = new observable(what);	
what                = whatObservale.data;

whatObservale.observe('value', () => {
		console.log("	ledPlugin LED observed> "+ what.value);
 		sendMsg("msg(jsdata,event,jsSource,none,jsdata(led1, " + what.value + "),1)");
  	});
	
//resources.pi.actuators.leds['1'] = what;
 

/*
whatObservale.observe('value', function (val) {
    console.info('Change detected by plugin for %s... %s', pluginName, "WE MUST GENERATE A qa EVENT");
    switchOnOff(val); //#B
});
*/
	
// 	console.info( "		CHANGED MODEL" );
//	console.info( what );
/* //ORIGINAL
  Object.observe(what, function (changes) {
    console.info('Change detected by plugin for %s...', pluginName);
    switchOnOff(model.value); //#B
  });
  */
};

function switchOnOff(value) {
  if (!localParams.simulate) {
    actuator.write(value === true ? 1 : 0, function () { //#C
      console.info('Changed value of %s to %s', pluginName, value);
    });
  }
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio, 'out'); //#D
  console.info('Hardware %s actuator started!', pluginName);
};

function simulate() {
  interval = setInterval(function () {
    // Switch value on a regular basis
    if (model.value) {
      model.value = false;
    } else {
      model.value = true;
    }
    console.log("LED=" + model.value);
  }, localParams.frequency);
  console.info('Simulated %s actuator started!', pluginName);
};

//#A Observe the model for the LEDs
//#B Listen for model changes, on changes call switchOnOff
//#C Change the LED state by changing the GPIO state
//#D Connect the GPIO in write (output) mode

