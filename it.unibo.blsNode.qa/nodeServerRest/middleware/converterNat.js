var 
  msgpack   = require('msgpack5')(),
  encode    = msgpack.encode, //#A
  json2html = require('node-json2html');

module.exports = function() { //#B
  return function (req, res, next) {
/*
//For testing, since req.accepts always returns  the argument and the if is always true
    console.info('Representation converter middleware called! '   );
    console.info(  req.result );
    console.info(  req.headers );
 	var acceptsHTML = req.accepts('html');
    console.info(  " ACCEPT acceptsHTML ="+ acceptsHTML );
	var acceptsProlog = req.accepts('application/prolog');
    console.info(  " ACCEPT acceptsProlog ="+ acceptsProlog );
*/	

/*
By AN
	Code working for clientData.js
*/
	var requestType = req.get('Content-Type');
    console.info(  " requestType="+ requestType );
    
    if (req.result) { //#C
    //by AN
      if( requestType === 'application/prolog' ) {		 
        console.info('prolog representation selected! '  );
        //console.info( req.result.value );
        res.send("msg( sensor, event, temperatureDev, none, " + req.result.value + ", 0 )"); //#E
        return;
      }
      
      if ( requestType === 'html' ) {
        console.info('HTML representation selected!');
        var transform = {'tag': 'div', 'html': '${name} : ${value}'};
        res.send(json2html.transform(req.result, transform)); //#E
        return;
      }
    	
 /*
 BOOK code only if the previous does not work
 	works with curl -H
 */
    
      if (req.accepts('application/prolog') ) {		//by AN
        console.info('prolog representation selected!');
        res.send("msg( sensor, event, temperatureDev, none," + req.result.value + ", 0 )"); //#E
        return;
       }
     
      if (req.accepts('json')) { //#D
        console.info('JSON representation selected!');
        res.send(req.result);
        return;
      }
      if (req.accepts('html')) {
        console.info('HTML representation selected!');
        var transform = {'tag': 'div', 'html': '${name} : ${value}'};
        res.send(json2html.transform(req.result, transform)); //#E
        return;
      }
      if (req.accepts('application/x-msgpack')) {
        console.info('MessagePack representation selected!');
        res.type('application/x-msgpack');
        res.send(encode(req.result)); //#F
        return;
      }
    

      console.info('Defaulting to JSON representation!');
      res.send(req.result); //#G
      return;

    }
    else {
      next(); //#H
    }
  }
};
//#A Require the two modules and instantiate a MessagePack encoder
//#B In Express, a middleware is usually a function returning a function
//#C Check if the previous middleware left a result for you in req.result
//#D Read the request header and check if the client requested HTML
//#E If HTML was requested, use json2html to transform the JSON into simple HTML
//#F Encode the JSON result into MessagePack using the encoder and return the result to the client
//#G For all other formats, default to JSON
//#H If no result was present in req.result, there’s not much you can do, so call the next middleware
