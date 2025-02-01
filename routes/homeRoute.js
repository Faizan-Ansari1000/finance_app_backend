const express = require('express');
const HomeModel = require('../models/homeModel');

const homeRoute = express.Router();

// post ;

homeRoute.post('/Construction', async (req, res) => {
    const { name, cnic, maxLoan, period } = req.body;

    try {
        if (!name || !cnic || !maxLoan || !period) {
            return res.status(400).json({ isSuccessfully: false, message: 'Validation error: All fields are required' });
        }

        const newObj = new HomeModel({
            name,
            cnic,
            maxLoan,
            period
        });

        await newObj.save();

        res.status(201).json({ isSuccessfully: true, message: 'Successfully Posted', data: newObj });
    } catch (error) {
        console.log(error);
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error' });
    }
});

homeRoute.get('/Construction', async (req, res) => {
    try {
        const userData = await HomeModel.find({})
        res.status(200).json({ isSuccessfully: true, message: 'SUccessfully Get Data', data: userData })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }

})

module.exports = homeRoute;