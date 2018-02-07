var 
  CorePlugin = require('./../corePlugin').CorePlugin,
  util       = require('util'),
  utils      = require('./../../utils/utils.js');
var observable = require('./../../nat/observableFactory'); 	//by AN
var sendMsg    = require('./../../nat/TcpClientToQaNode'); 	//by AN

var actuator, model;

var LedsPlugin = exports.LedsPlugin = function (params) { //#A
  CorePlugin.call(this, params, 'leds',
    stop, simulate, ['ledState'], switchOnOff); //#B
  model = this.model;
  //console.log("LedsPlugin MDOEL=" );
  //console.log( model );		//LEDS only , by AN
  this.addValue(false);
  natObserve( model )
};
util.inherits(LedsPlugin, CorePlugin); //#C

//by AN
function natObserve(what) {
	console.info('natObserve ---------------------------  '  );
 	console.info( what);
 	console.info( what.data );
//Change the model into an observable	
const whatObservale = new observable(what);  	//OLD what
what                = whatObservale ;
	console.info('ledPlugin natObserve %%%%%%%%%%%%%%%%%%%%%%%%%%%% '  );
	console.info( what);
//See routesCreation

whatObservale.observe('data', () => { 
		console.log("	ledPlugin LED observed> "+ what.data);
		console.log( what.data.data ); //[ { '1': false, '2': false, timestamp: '2017-08-19T10:35:56.419Z' } ]
		//console.log( what.data.data[0][1] ); //false or true
		//console.log( what.data.data[0][2] ); //false or true
 		//sendMsg("msg(jsdata,event,jsSource,none,jsdata(led1, " + what.value + "),1)");
  	});
/*
//DOES NOT WORK
whatObservale.observe('data[0]', () => { 
		console.log("	ledPlugin LED observed>>> "+ what.data);
		console.log( what.data.data ); //[ { '1': false, '2': false, timestamp: '2017-08-19T10:35:56.419Z' } ]
		//console.log( what.data.data[0][1] ); //false or true
		//console.log( what.data.data[0][2] ); //false or true
 		//sendMsg("msg(jsdata,event,jsSource,none,jsdata(led1, " + what.value + "),1)");
  	});
 */
console.info( "		CHANGED LED MODEL (natObserve)" );
}


function switchOnOff(value) {
  var self = this;
  if (!this.params.simulate) {
    actuator.write(value.state === true ? 1 : 0, function () {
      self.addValue(value.state); //#D
    });
  } else {
    self.addValue(value.state);
  }
  value.status = 'completed'; //#E
  console.info('Changed value of %s to %s', self.model.name, value.state);
};

function stop() {
  actuator.unexport();
};

function simulate() {
  console.info("		LED SIMULATE (doing nothing)" );  //by AN
  //this.addValue(false);
};

LedsPlugin.prototype.createValue = function (data){
  return {"1" : data, "2" : false, "timestamp" : utils.isoTimestamp()};
};

LedsPlugin.prototype.connectHardware = function () { //#F
  var Gpio = require('onoff').Gpio; //#G
  var self = this;
  actuator = new Gpio(self.model.values['1'].customFields.gpio, 'out');
  console.info('Hardware %s actuator started!', self.model.name);
};

//#A Call the initalization function of the parent plugin (corePlugin.js)
//#B Pass it the property you’ll update (leds) and the actions you want to observe (ledState) as well as the implementation of what to do when a ledState action is created (switchOnOff)
//#C Make the LedsPlugin inherit from all the corePlugin.js functionality
//#D Add a new data entry to the property in the model
//#E Change status to 'completed' as the LED state was changed
//#F Extend the function connectHardware of corePlugin.js
//#G Change the state of the LED using the on/off library

