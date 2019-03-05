var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    firstName: String,
    lastName: String,
    homePhone: Number,
    workPhone: Number,
    dob: Number,
    title: String,
    price: Number,
    likes: {type: Number, default: 0},
    imgUrl: String
});

module.exports = mongoose.model('Product', product); 