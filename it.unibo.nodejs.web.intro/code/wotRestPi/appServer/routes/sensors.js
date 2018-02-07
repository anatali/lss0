/*
 * appServer/routes/sensors.js
 */
var express = require('express'),
  router    = express.Router(),
  model     = require('./../models/model');

router.route('/').get(function (req, res, next) {
    req.type = "defaultView" ;
  	req.result = model.links.properties.resources; //#A
//   console.log( "---------------" );
// 	console.log( req.result );
//  	res.end( "Please sepcify " + req.result );
    next(); //#B
});

router.route('/pir').get(function (req, res, next) {
  req.result = model.pi.sensors.pir;
  next();
});

router.route('/temperature').get(function (req, res, next) {
	  console.log( "................" );
	  console.log( req.result );
    req.result = model.links.properties.resources.temperature;
	console.log( req.result );
  console.log( "................" );
  next();
});

router.route('/temperatureProlog').get(function (req, res, next) {
  var tval =  model.pi.sensors.temperature.value ;
  console.log(tval);
  req.result = "msg( sensor, event, temperatureDev, none, "+ tval+", 0 )";
  //req.result = "msg( sensor, event, temperatureDev, none, 22, 0 )";
  next();
});

router.route('/humidity').get(function (req, res, next) {
  req.result = model.pi.sensors.humidity;
  next();
});

module.exports = router;


 