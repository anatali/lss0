/*
 * wotSerevr.js 
 */
var  restApp    = require('./app');
var  wsServer   = require('./websockets');
var  resources  = require('./appServer/models/model');

var createServer = function (port, secure) {
  console.log("process.env.PORT=" + process.env.PORT + " port=" + port);
  if (process.env.PORT) port = process.env.PORT;
  else if (port === undefined) port = resources.customFields.port;
  if (secure === undefined) secure = resources.customFields.secure;

  initPlugins(); //#A

  var http = require('http');
    return server = http.createServer(restApp)
      .listen(process.env.PORT || port, function () {
        wsServer.listen(server);	//webSocket server;
        console.log('Insecure WoT server started on port %s', port);
    })
};

function initPlugins() {
// var LedsPlugin  = require('./plugins/internal/ledsPlugin').LedsPlugin;
   var Dht22Plugin = require('./plugins/internal/dht22Plugin').Dht22Plugin;

//  ledsPlugin = new LedsPlugin({'simulate': true, 'frequency': 5000});
//  ledsPlugin.start();
  dht22Plugin = new Dht22Plugin({'simulate': true, 'frequency': 5000});
  dht22Plugin.start();
}

process.on('SIGINT', function () {
//  ledsPlugin.stop();
//  pirPlugin.stop();
  dht22Plugin.stop();
  console.log('Bye, bye!');
  process.exit();
});

createServer(3000);
  