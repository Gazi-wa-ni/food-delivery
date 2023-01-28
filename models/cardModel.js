const mongoose = require('mongoose');
const cardschema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    _item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'items'
    },
    productName: {
        required: true,
        type: String,
    },
    productPrice: {
        required: true,
        type: String,
    },
    category: {
        required: true,
        type: String,
    }
})
const cardModel = mongoose.model('cards', cardschema);
module.exports = cardModel;