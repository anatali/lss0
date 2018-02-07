var mongoose    = require('mongoose');
var MongoClient = require('mongodb').MongoClient;


var dataSchema = new mongoose.Schema({
    name: String,
    password: { type: String, required: true }
});


var DataItem  = mongoose.model("UserItem", dataSchema);

module.exports = DataItem;