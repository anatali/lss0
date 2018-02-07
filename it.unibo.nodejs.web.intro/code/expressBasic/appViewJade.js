/*
* =====================================
* expressBasic/appViewJade.js
* =====================================
*/
var express = require("express");
var http    = require("http");
var logger  = require("morgan");
var path    = require("path");
var app     = express();         

app.use( logger("short") ) ;	 

app.use(express.static(path.join(__dirname, 'views'))); //for style.css;

app.set("view engine", "jade");
app.set("views", path.resolve(__dirname, "views"));

app.get("/", function(request, response) {
		response.render("example" ,{
			title: "Application"
		});
});

http.createServer(app).listen(3000, function(){
	console.log('bound to port 3000');
});

