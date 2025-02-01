const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cnic: {
        type: Number,
        required: true
    },
    maxLoan: {
        type: Number,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
})

const HomeModel = mongoose.model('Home', homeSchema);
module.exports = HomeModel;