/*
* =====================================
* webserver0.js
* =====================================
*/
var http = require("http");
var port = 8080;

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req,res){
  console.log('Client request for ' + req.url);
  res.writeHeader(200, {'Content-Type': 'application/json'});  
  switch(req.url) {  
    case '/temperature':
      //Return the corresponding JSON
      res.write('{"temperature" :' + randomInt(1, 40) + '}'); 
      break;
    case '/light':
      res.write('{"light" :' + randomInt(1, 100) + '}');
      break;
    default:
      res.write('{"hello" : "world"}');
  }
  res.end();  
}).listen(port);

console.log('Server listening on http://localhost:' + port);

 
