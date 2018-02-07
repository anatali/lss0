/*
* mvcBasic/dataModel.js
*/
var mongoose = require( 'mongoose' );

var dataSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    age:      { type: Number, required: true },
    password: { type: String, required: true }
});
//Create a data model using the schema;
var User = mongoose.model('user', dataSchema);	//collection users;	
module.exports = User;