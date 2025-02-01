const mongoose = require('mongoose');

const weddingModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    maxLoan: {
        type: Number,
        required: true,
        length: 8,
    },
    period: {
        type: Number,
        required: true,
    },
    cnic: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value.toString().length === 13; 
            },
            message: 'CNIC must be 13 digits long',
        },
    },
});

const Wedding = mongoose.model('Wedding', weddingModel);

module.exports = Wedding;
