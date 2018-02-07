/*
* =====================================
* nodejs/ServerUtils.js
* =====================================
*/
var fs = require('fs');

exports.renderStaticFile = function(path,response){
	try{
		fs.stat(path, function(err, stat){ //stat provides information about the file;
			if (err) {
				renderFileError(err, path, response);
			} else {
				if( stat.size == 0 ){
					response.statusCode = 500;
					response.end('Attempt to acces to an empty or non-existing file ' );
				}else{
					//readStaticFile(path,response);
					readStaticFilePiping(path,response);
				}
				 
	 		}
		});
	}catch(exception){
		response.statusCode = 400;
		response.end('ERROR ' + exception);		
	}
};

var renderFileError = function(err, path, response){
	if ('ENOENT' == err.code) {
		response.statusCode = 404;
		response.end('Sorry, file Not Found ' + path );
	} else {
		response.statusCode = 500;
		response.end('Internal Server Error ' + err);
	}	
}

var readStaticFile = function(path, response){
	var stream = fs.createReadStream(path);	
	//console.log('ServerUtils renderStaticFile path=', path); 
	stream.on('data', function(chunk){
		response.write(chunk);
	});
	stream.on('error', function(err){
		response.statusCode = 500;
		response.end('Internal Server Error ' + err);
		/*
		 * If we have no index.html file and omit test at line 14, we have:
		 * Internal Server Error Error: EISDIR: illegal operation on a directory, read
		 */
	});
	stream.on('end', function(){
		response.end();
	});
}

var readStaticFilePiping = function(path, response){
	var stream = fs.createReadStream(path);	
	//console.log('ServerUtils renderStaticFilePiping path=', path); 
	stream.pipe(response);
	stream.on('error', function(err){
		response.statusCode = 500;
		response.end('Internal Server Error ' + err);
	});
}
