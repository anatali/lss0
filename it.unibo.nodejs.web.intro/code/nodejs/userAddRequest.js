/*
 * nodejs/userAddRequest.js
 */

var request = require("request");
require('../utils');

var urlAdd = 'http://localhost:3000/add';
var options = { method: 'PUT',  url: urlAdd,
  headers: 
   { 'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: { name: 'Jack', age: '57', password: 'pswdJack' },
  json: true 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log("ANSWER from server:"+body);
});

console.log("userAddRequest START");
