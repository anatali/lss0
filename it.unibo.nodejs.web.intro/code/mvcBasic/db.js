/*
 * mvcBasic/db.js
 */
var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/mongoNaive';

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.Promise = global.Promise;  //to avoid deprecated promise;

mongoose.connect( dbURI,{useMongoClient: true}); 	//option required from 4.11.0;

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
	console.log("************** SIGUSR2");
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
	console.log("************** SIGINT");
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
	console.log("************** SIGTERM");
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});
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

 