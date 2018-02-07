/*
* =====================================
* expresponsesBasic/blog.js
* =====================================
*/
var http        = require("http");
var path        = require("path");
var express     = require("express");
var logger      = require("morgan");
var bodyParser  = require("body-parser");

var app          = express();

var items        = [];
app.locals.items = items;	//make items available to all views

app.use(logger("dev"));

//var publicPath = path.resolve(__dirname, "public");
//app.use(express.static(publicPath));

app.set("views", path.resolve(__dirname, "blogViews"));
app.set("view engine", "jade");
/*
 * The body-parser module does the parsing of the body of a POST 
 * and populates  the request.body variable
 */
app.use( bodyParser.json( ) );
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(request, response) {
	console.log("get " + request.body)
    response.render("index");
});

app.get("/newitem", function(request, response) {
  console.log("get " + request.body)
  response.render("newItem");
});

app.post("/newitem", function(request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Item must have a title and a body.");
    return;
  }
   addNewItem(request.body);
  //Redirects to the homepage to show the new item
  response.redirect("/");
});

//When requesting an unknown source
app.use(function(request, response) {
   //set status code for the response to 404: page not found
  response.status(404).render("error", {
		message: "404: page not found"
  });
});

/*
 * Utilties
 */
var addNewItem = function(userItem){
	console.log("addNewItem " + userItem.title)
	  items.push({
		    title: userItem.title,
		    body:  userItem.body,
		    published: new Date()
	  });	
}
/*
 * START
 */
http.createServer(app).listen(3000, function() {
  console.log("Blog started at 3000");
});
