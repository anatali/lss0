/*
 * mongoNaive/useMongoose.js
 */
var mongoose       = require( 'mongoose' );
var utilsMongoose  = require('./utilsMongoose');
mongoose.Promise   = global.Promise; //to avoid deprecated promise;
var dbURI = 'mongodb://localhost:27017/mongoNaive'; 

var dataSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    age:      { type: Number, required: true },
    password: { type: String, required: true }
});
//custom methods;
dataSchema.methods.setName = function(newame) {
	this.name = newame;
	console.log("name= " + this.name);
	return this.name;
}
dataSchema.methods.incage = function() {
	this.age = this.age+10;
	console.log("age= " + this.age);
	return this.age;
}
//At every save, hash the password;
dataSchema.pre('save', function(next){
	var user       = this;
	user.password  = user.password+"1";
	next();
});


//Create a data model using the schema;
var User = mongoose.model('user', dataSchema);	//collection users;
//Query;
var findUser = function( name, agemin, agemax ){
	  User.
		  findOne( {} ).
		  select('name age password').
		  where('name').equals(name).
		  where('age').gt(agemin).lt(agemax).
	  	  exec( showUser );	
}
//Function that can be used as a callback;
var showUser = function (err, user) {
	  if (err) throw err;
	  if( user == null ) console.log("no data");
	  else console.log('user: %s age=%s  pswd=%s.', user.name, user.age, user.password)  
};

//Create a new User;
var alice = new User({
	  name: 'Alice',
	  age: 22,
 	  password: 'pswdAlice' 
});
var bob = new User({
	  name: 'Bob',
	  age: 33,
	  password: 'pswdBob' 
});


//Store in sequence;
var storeSomeDataCallback = function(){
	alice.save(function(err) {
		if (err) throw err;
		console.log('Alice saved successfully!');
		bob.save(function(err) {
			if (err) throw err;
			console.log('Bob saved successfully!');
			//At the end we close the connection;
			mongoose.connection.close();
		});
	});
};

//Store asynch;
var storeSomeData = function(){
	alice.save(function(err) {
		if (err) throw err;
		console.log('Alice saved successfully!');
		findUser("Alice", 0,40);
	});
	bob.save(function(err) {
		if (err) throw err;
		console.log('Bob saved successfully!');
		findUser("Bob", 0,40);
	});
};
 
var main = function(){
	console.log("CONNECT");
  	storeSomeDataCallback();
//	storeSomeDataCallback();
// 	storeSomeData();	//WARNING: asynch!!;
	console.log("---------------------");
 	var query = User.findOne({ 'name': 'Alice' } );  
	query.select('name age password');		//select fields;
	query.exec( showUser );
	console.log("---------------------");
}

main( );