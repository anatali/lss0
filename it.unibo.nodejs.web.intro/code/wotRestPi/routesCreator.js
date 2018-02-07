var express = require('express'),
  router    = express.Router(),
  uuid      = require('node-uuid'),
  utils     = require('./utils');

exports.create = function (model) {

  createDefaultData(model.links.properties.resources);
  createDefaultData(model.links.actions.resources);

  // Let's create the routes
  createRootRoute(model);
  createModelRoutes(model);
  createPropertiesRoutes(model);
  createActionsRoutes(model);

  return router;
};


function createRootRoute(model) {
  router.route('/').get(function (req, res, next) {
	
	console.log("	ROUTE ROOT"  );
    
    req.model = model;
    req.type = 'root';

    var fields = ['id', 'name', 'description', 'tags', 'customFields'];
    req.result = utils.extractFields(fields, model);

    if (model['@context']) type = model['@context'];
    else type = 'http://model.webofthings.io/';

    res.links({
      model: '/model/',
      properties: '/properties/',
      actions: '/actions/',
      things: '/things/',
      help: '/help/',
      ui: '/',
      type: type
    });

    next();
  });
};


function createModelRoutes(model) {
  // GET /model
  router.route('/model').get(function (req, res, next) {
    req.result = model;
    req.model = model;

    if (model['@context']) type = model['@context'];
    else type = 'http://model.webofthings.io/';
    res.links({
      type: type
    });

    next();
  });
};

function createPropertiesRoutes(model) {
  var properties = model.links.properties;

  // GET /properties
  router.route(properties.link).get(function (req, res, next) {
    req.model = model;
    req.type = 'properties';
    req.entityId = 'properties';

    req.result = utils.modelToResources(properties.resources, true);

    // Generate the Link headers 
    if (properties['@context']) type = properties['@context'];
    else type = 'http://model.webofthings.io/#properties-resource';

    res.links({
      type: type
    });

    next();
  });

  // GET /properties/{id}
  router.route(properties.link + '/:id').get(function (req, res, next) {
    req.model = model;
    req.propertyModel = properties.resources[req.params.id];
    req.type = 'property';
    req.entityId = req.params.id;
    
	console.log("GET /properties/{id} req.params.id="+ req.params.id + " properties.link=" + properties.link );
	console.log( properties.resources[req.params.id]);
	console.log( properties.resources[req.params.id].data);
    req.result = reverseResults(properties.resources[req.params.id].data);

    // Generate the Link headers 
    if (properties.resources[req.params.id]['@context']) type = properties.resources[req.params.id]['@context'];
    else type = 'http://model.webofthings.io/#properties-resource';

    res.links({
      type: type
    });

    next();
  }).put(function(req, res, next) {
/*
By AN
This rout should be eliminated, since we should change the state of the LED by using actions only
*/
    console.log( "		PUT " );
	var ledData = properties.resources[req.params.id].data[0];
    console.log( "req.params.id="+req.params.id );
    console.log( ledData );
    console.log("value of led 1="+ledData[2]);
    console.log( "req.body"  );
    console.log( req.body  );
    var reqData = req.body[2]
    console.log( "new value of led 1="+reqData  );
    //properties.resources[req.params.id].data[0] = req.body;
    ledData[2]=req.body[2];
	next();
});



router.route('/properties/leds/:id').get(function (req, res, next) { //#A
   console.info(" ROUTER" );
  next();
}).put(function(req, res, next) { //#B
  //UPDATE the value of the selected LED in the model
   console.info('	route properties/leds Changing LED %s value to %s id=%s', req.params.id, req.body.value );
   console.info( properties.resources.leds.data[0] );
   var ledData = properties.resources.leds.data[0][req.params.id];
     // console.info("	current ledData=" + ledData);
     //[ { '1': false, '2': false, timestamp: '2017-08-19T10:35:56.419Z' } ]
   properties.resources.leds.data[0][req.params.id]=req.body.value ;	//to update the observable??
   //properties.resources.leds.data = [ { '1': true, '2': true, timestamp: '2017-08-19T10:35:56.419Z' } ];
   properties.resources.leds.data = properties.resources.leds.data;  //to update the observable
   req.result = properties.resources.leds.data[0][req.params.id];
   
  /*
  //console.info(selectedLed);
  console.info(req.body);
  //for( i in req ){ console.info('req field %s = %s ',   i, req.body.value);  }	
  selectedLed.value = req.body.value;  //#C
  console.info('route LED  Changed LED %s value to %s', req.params.id, selectedLed.value);
  req.result = selectedLed;
  */
  next();
});

};

function createActionsRoutes(model) {
  var actions = model.links.actions;

  // GET /actions
  router.route(actions.link).get(function (req, res, next) {
    req.result = utils.modelToResources(actions.resources, true);
    
    req.model = model;
    req.type = 'actions';
    req.entityId = 'actions';

    if (actions['@context']) type = actions['@context'];
    else type = 'http://model.webofthings.io/#actions-resource';

    res.links({
      type: type
    });

    next();
  });

  // POST /actions/{actionType}
  router.route(actions.link + '/:actionType').post(function (req, res, next) {
  
    var action = req.body; //req.body;  //by AN
    console.log("-------------------------------------------");
    console.log("POST action:");
    console.log(req.query);
    console.log(action);
    console.log(action.id);
     //console.log(uuid);
    console.log(req.originalUrl);
    console.log(req.params.actionType);
    console.log(actions.resources);
    console.log(actions.resources[req.params.actionType].data);
    console.log(req.originalUrl + '/' + action.id);
    console.log("-------------------------------------------");
    action.id        =  uuid.v1();
    action.status    = "pending";
    action.timestamp = utils.isoTimestamp();
    utils.cappedPush(actions.resources[req.params.actionType].data, action);
    res.location(req.originalUrl + '/' + action.id);

   	console.log("-------------------------------------------");
	console.log("WE SHOULD EXECUTE " + req.originalUrl + '/' + action.id);
   	console.log("-------------------------------------------");
    next();
  });


  // GET /actions/{actionType}
  router.route(actions.link + '/:actionType').get(function (req, res, next) {

    req.result = reverseResults(actions.resources[req.params.actionType].data);
    req.actionModel = actions.resources[req.params.actionType];
    req.model = model;

    req.type = 'action';
    req.entityId = req.params.actionType;

    if (actions.resources[req.params.actionType]['@context']) type = actions.resources[req.params.actionType]['@context'];
    else type = 'http://model.webofthings.io/#actions-resource';

    res.links({
      type: type
    });


    next();
  });

  // GET /actions/{id}/{actionId}
  router.route(actions.link + '/:actionType/:actionId').get(function (req, res, next) {
    req.result = utils.findObjectInArray(actions.resources[req.params.actionType].data,
      {"id" : req.params.actionId});
    next();
  });
};



function createDefaultData(resources) {
  Object.keys(resources).forEach(function (resKey) {
    var resource = resources[resKey];
    resource.data = [];
  });
}

function reverseResults(array) {
  return array.slice(0).reverse();
}



