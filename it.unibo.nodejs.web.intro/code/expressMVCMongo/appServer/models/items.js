var mongoose = require('mongoose');

var itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

var Items = mongoose.model('Items', itemsSchema);
//exports.Items;

//mongoose.model('Items', itemsSchema);

module.exports = Items;