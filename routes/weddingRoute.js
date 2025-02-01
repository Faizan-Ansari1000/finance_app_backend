const express = require('express');
const Wedding = require('../models/weddingSchema');
const weddingRoute = express.Router();

weddingRoute.get('/userWedding', async (req, res) => {
    try {
        const userData = await Wedding.find().lean().exec();
        console.log(userData);
        return res.status(200).json({ data: userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// post
weddingRoute.post('/userWedding', async (req, res) => {
    const { name, cnic, maxLoan, period } = req.body;
    try {
        if (!name || !cnic || !maxLoan || !period) {
            return res.status(400).json({ message: 'Validation error' });
        }

        const obj = new Wedding({
            name,
            cnic,
            maxLoan,
            period
        })

        await obj.save()
        res.status(201).json({ isSuccessfully: true, message: 'Category added successfully', data: obj });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = weddingRoute;