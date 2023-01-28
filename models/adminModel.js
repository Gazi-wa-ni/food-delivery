const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
})
const adminModel = mongoose.model('admin_', adminSchema);
module.exports = adminModel;