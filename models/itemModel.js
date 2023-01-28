const mongoose = require('mongoose');
const foodschema = new mongoose.Schema({
    productName: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: String,
    },
    category: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String
    }

})
const itemModel = mongoose.model('items', foodschema);
module.exports = itemModel;