/*
* =====================================
* fileWrite.js
* =====================================
*/
//works with reference to the file  sharedFiles/cmd.txt
var fs   = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command         = args.shift();
var inputData       = args.join(' ');
var file            = path.join(process.cwd(), '../sharedFiles/cmd.txt');

switch(command) {
  case 'read':
    readData(file);
    break;
  case 'write':
	  storeData(file, inputData+"\n");
    break;
  default:
    console.log('Usage: ' + process.argv[0] + ' read|write [inputData]');
}

function loadOrInitializeTaskArray(file, cb) {
  fs.exists(file, function(exists) {
    var oldData = [];
    if (exists) {
        fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        var newdata = data.toString();
        cb(newdata);
      });
    } else {
      cb([]); 
    }
  });
}
function readData(file) {
  loadOrInitializeTaskArray(file, function(data) {
	  console.log( data );
  });
}
function storeData(file, newData) {
  fs.writeFile(file, newData, 'utf8', function(err) {
    if (err) throw err;
    console.log('Saved: ' + newData);
  });
}