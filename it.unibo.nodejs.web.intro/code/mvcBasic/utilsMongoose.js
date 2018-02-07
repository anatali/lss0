/*
 * mongoNaive/utilsMongoose.js
 */
var mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;

var dbURI = 'mongodb://localhost:27017/mongoNaive';
if (process.env.NODE_ENV === 'production') {dbURI = process.env.MONGOLAB_URI;}

mongoose.connect( dbURI,{useMongoClient: true}); //option required from 4.11.0;
 
mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});

var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts;
process.once('SIGUSR2', function () {
	console.log("*** SIGUSR2");
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// For app termination;
process.on('SIGINT', function() {
	console.log("*** SIGINT");
	gracefulShutdown('app termination', function () {
		process.exit(0);
	});
});
// For Heroku app termination;
process.on('SIGTERM', function() {
	console.log("***  SIGTERM");
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);
	});
});
/*
 * Finding url parts
 */
var url = require('url'),
   qs   = require('querystring');
 
var requestUtil = function(req,res,cb){
var urlParts    = url.parse(req.url, true),
	urlParams   = urlParts.query, 
	urlPathname = urlParts.pathname,
	body = '',
	reqInfo = {};

req.on('data', function (data) {
 body += data; 
});
req.on('end', function () {
 	//console.log("urlPathname="+urlPathname + " bdoy=" + body + " query="  + JSON.stringify( urlParts.query ) );
	//console.log( urlParts.query );
 	//reqInfo.request     = req;
	reqInfo.method      = req.method;		//'GET'
	reqInfo.urlPathname = urlPathname;  	//'/api/user'
	reqInfo.urlParams   = urlParams;  		//{}
	reqInfo.body        = body;  
	reqInfo.query       = urlParts.query;	//{}
	reqInfo.urlParts    = urlParts;
	//console.log( reqInfo    );
	cb(reqInfo,res);
 });	
}

/*
 * uncaughtException handling
 * See https://coderwall.com/p/4yis4w/node-js-uncaught-exceptions
 */
process.on('uncaughtException', function (err) {
	console.error('ERROR: got uncaught exception:', err.message);
	process.exit(1);		//MANDATORY!!!
});
process.on('exit', function(code){
	console.log("Exiting code= " + code );
});

module.exports=requestUtil;
