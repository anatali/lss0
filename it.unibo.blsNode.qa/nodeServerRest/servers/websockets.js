var 
  WebSocketServer = require('ws').Server,
  resources       = require('./../resources/model');	//exports resources.json

exports.listen = function(server) {
  var wss = new WebSocketServer({server: server}); //#A
  console.info('		WebSocket server started...');
 
  wss.on('connection', function (ws) { //#B
    var url = ws.upgradeReq.url;
    try {
    	/*
    	The Object.observe() method was used for asynchronously observing the changes to an object. 
    	It provided a stream of changes in the order in which they occur. 
    	However, this API has been deprecated and removed from browsers. 
    	You can use the more general Proxy object instead.
    	*/
       	console.info("---------------------------------");
    	var obj = selectResouce(url);
     	console.info("		websockets connection:" + url + " Obj=" + obj + " name=" + obj.name + " value=" + obj.value);
     	console.info(url);
     	console.info(obj);
       	console.info("---------------------------------");
 		
 		ws.send( JSON.stringify(obj.value), function () {});   	
 
    	var p = new Proxy(obj,  {
		  set(target, name, value) {
		  	var s = JSON.stringify(value);
		    console.log("		websockets proxy set " + name + " to " + value + " s=" + s + " target.description=" + target.description);
			ws.send(s, function () {});   
		    target.value = value;
		  } 
  		});
  		
  		//p.value = 33;	//WE should change DHT22SensorPlugin
  		
  		//obj.setProxy(p); //change the model ....

/*
		  //WE MUST USE obj from now, in any case

 		  obj = Object.observe(x, function(changes) {
  			changes.forEach(function(c, i) {
    			console.log(c);
  			});
		  });
*/		  
 
//        Object.observe(selectResouce(url), function (changes) { //#C
//	        ws.send(JSON.stringify(changes[0].object), function () {
//	        });
//      })
    }
    catch (e) { //#D
      console.log('		websockets Unable to observe %s resource. obj.value= %s', url, obj.value );
    };
  });
};

function selectResouce(url) { //#E
  var parts = url.split('/');
  parts.shift();
  var result = resources;
  console.info(resources);
  for (var i = 0; i < parts.length; i++) {
    result = result[parts[i]];
  }
  return result;
}


/*
npm install proxy-observe
Placeholder object which contains traps.
Trap = The method that provide property access. This is analogous to the concept of traps in operating systems.

var handler = {
    get: function(target, name) {
        return name in target ?
            target[name] :
            37;
    }
};
*/


//#A Create a WebSockets server by passing it the Express server
//#B Triggered after a protocol upgrade when the client connected
//#C Register an observer corresponding to the resource in the protocol upgrade URL
//#D Use a try/catch to catch to intercept errors (e.g., malformed/unsupported URLs)
//#E This function takes a request URL and returns the corresponding resource


(function() {
'use strict';

// TODO: support 3rd param acceptList
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
var observe = function(obj, callback) {
  if (Object(obj) !== obj) {
    throw new TypeError('target must be an Object, given ' + obj);
  }
  if (typeof callback !== 'function') {
    throw 'observer must be a function, given ' + callback;
  }

  return new Proxy(obj, {

    set(target, propKey, value, receiver) {
      var oldVal = target[propKey];

      // Don't send change record if value didn't change.
      if (oldVal === value) {
        return;
      }

      let type = oldVal === undefined ? 'add' : 'update';

      var changeRecord = {
        name: propKey,
        type: type,
        object: target
      };

      if (type === 'update') {
        changeRecord.oldValue = oldVal;
      }

      target[propKey] = value; // set prop value on target.

      // TODO: handle multiple changes in a single callback.
      callback([changeRecord]);
    },

    deleteProperty(target, propKey, receiver) {
      // Don't send change record if prop doesn't exist.
      if (!(propKey in target)) {
        return;
      }
      var changeRecord = {
        name: propKey,
        type: 'delete',
        object: target,
        oldValue: target[propKey]
      };

      delete target[propKey]; // remove prop from target.

      // TODO: handle multiple changes in a single callback.
      callback([changeRecord]);
    }
  });
};

if (!Object.observe) {
  Object.observe = observe;
}

})();

