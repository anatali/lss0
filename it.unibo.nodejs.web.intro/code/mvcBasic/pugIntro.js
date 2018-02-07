/*
 * mvcBasic/pugIntro.js
 */
var pug = require('pug');
var fs  = require('fs');
 
const compiledFunction = pug.compileFile('template.pug');
var html = compiledFunction({
	name: 'Bob'
});

fs.writeFile('genFromTemplate.html', html, 'utf8', 
		function(err) { if (err) throw err; 
			console.log("HTML written on file genFromTemplate.html" );
		}
);

console.log("html=" + html );	

/*
var html1 = pug.renderFile('template1.pug', {
	  name: 'Alice'
	}
);
console.log("html1=" + html );	
	
	

//Render a set of data
console.log(compiledFunction({
	name: 'Timothy'
}));
//"<p>Timothy's Pug source code!</p>"

//Render another set of data
console.log(compiledFunction({
	name: 'Forbes'
}));
//"<p>Forbes's Pug source code!</p>"

//Compile template.pug, and render a set of data
console.log(pug.renderFile('template1.pug', {
  name: 'Alice'
}));
// "<p>Timothy's Pug source code!</p>"

*/
//compile
//var fn   = pug.compile('p #{name} compiled!', options);
//var html = fn(locals);
//console.log("html=" + html );

//render
//var html = pug.render('string of pug', merge(options, locals));

//renderFile
//var html = pug.renderFile('template1.pug', merge(options, locals));
