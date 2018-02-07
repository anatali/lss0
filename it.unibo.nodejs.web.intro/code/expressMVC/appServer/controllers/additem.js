var app  = require("../../app");

module.exports.showAddItemPage = function(request, response) {
 	  response.render("newItem");
};

module.exports.addAnItem = function(request, response) {
 	  if (! request.body.title || ! request.body.body) {
		    response.status(400).send("Item must have a title and a body.");
		    return;
      }
      addNewItem(request.body);
	  //Redirects to the homepage to show the new item
	  response.redirect("/");
};

var addNewItem = function(userItem){
	  console.log("addNewItem " + userItem.title + " items=" + app.items ); //+ " items=" + items
	  
	  app.items.push({
		    title: userItem.title,
		    body:  userItem.body,
		    published: new Date()
	  });	
}