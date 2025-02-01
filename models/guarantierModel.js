const mongoose = require('mongoose');

const guarantier = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cnic: {
        type: Number,
        required: true
    },
})

const userGuarantier = mongoose.model('Guarantier', guarantier);
module.exports = userGuarantier;