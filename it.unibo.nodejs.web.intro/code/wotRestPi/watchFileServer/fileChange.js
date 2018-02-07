/*
 * watchFileServer/fileChange.js
*/
var watch = require('node-watch'); //returns a fs.FSWatcher;
  console.log("fileChange STARTS");
 
  watch('aFile.txt', function(event, filename) {
	  console.log("**** " + event + " " + filename);
  });
