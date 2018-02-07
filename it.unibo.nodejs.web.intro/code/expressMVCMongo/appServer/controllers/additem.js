var Items  = require("../models/items");

module.exports.showAddItemPage = function(request, response) {
 	  response.render("newItem");
};

module.exports.addAnItem = function(request, response) {
 	  if (! request.body.title || ! request.body.body) {
		    response.status(400).send("Item must have a title and a body.");
		    return;
      }
      addNewItem(request.body,response);
	  //Redirects to the homepage to show the new item
	  response.redirect("/");
};

var addNewItem = function(userItem, response){
	  console.log("addNewItem " + userItem.title );  
	  /*
	  app.items.push({
		    title: userItem.title,
		    body:  userItem.body,
		    published: new Date()
	  });	
	  */
	  var myData = new Items( { name:userItem.title, body:userItem.body} );
	  myData.save()
	  	.then(item => {
	  		//response.send("item saved to database");
	  		console.log("addNewItem saved "  );  
	    })
	    .catch(err => {
	    	//response.status(400).send("unable to save to database");
	    	console.log("addNewItem ERROR"   );  
	    });
	  
}