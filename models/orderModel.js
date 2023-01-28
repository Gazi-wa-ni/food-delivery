const mongoose = require('mongoose');
const orderschema = new mongoose.Schema({
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
    name: {
        required: true,
        type: String
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
    },
    cityName: {
        required: true,
        type: String,
    },
    streetAddress: {
        required: true,
        type: String,
    },
    zipCode: {
        required: true,
        type: String,
    },
    qty: {
        required: true,
        type: String,
    },
    status: {
        type: String
    },
    phno: {
        required: true,
        type: String
    }

})
const orderModel = mongoose.model('orders', orderschema);
module.exports = orderModel;