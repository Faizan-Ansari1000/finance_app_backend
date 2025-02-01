const express = require('express');
const userGuarantier = require('../models/guarantierModel');

const loanGuarantier = express.Router();

loanGuarantier.post('/guarantier', async (req, res) => {
    const { name, email, cnic } = req.body;
    try {
        if (!name || !email || !cnic) {
            return res.status(404).json({ message: 'Validation error' })
        }
        const existingGuarantier = await userGuarantier.findOne({ cnic })
        if (existingGuarantier) {
            return res.status(409).json({ message: 'Guarantier is already exist in a other User' })
        }
        const newGuarantier = new userGuarantier({
            name,
            email,
            cnic
        })

        await newGuarantier.save()
        res.status(201).json({ isSuccessfully: true, message: 'Guaraniter is Added', data: { userData: newGuarantier } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


//getAPi
loanGuarantier.get('/guarantier', async (req, res) => {
    try {
        const users = await userGuarantier.find();
        res.status(200).json({
            isSuccessfully: true,
            message: 'Successfully Fetched Data',
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = loanGuarantier