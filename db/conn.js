const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const conn = async () => {
    try {
        const result = await mongoose.connect("mongodb://127.0.0.1:27017/foodDivlivery", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (result) console.log('connected');
        else console.log('error');
    } catch (error) {
        console.log(error);
    }

}

conn();

module.exports = conn