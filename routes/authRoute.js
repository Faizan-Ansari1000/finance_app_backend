const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const authRoute = express.Router();

// signUp
authRoute.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(401).json({ message: 'Validation error' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: 'is Email are already exist' })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        await newUser.save();
        res.status(201).json({ isSuccessfully: true, message: 'User Successfully created', data: { userData: newUser } })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


//get signUp
authRoute.get('/signUp', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({
            isSuccessfully: true,
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//login 
authRoute.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Validation error' });
        }


        if (email === "admin123@example.com" && password === "admin123") {
            return res.status(200).json({
                isSuccessfully: true,
                message: 'Admin successfully logged in',
                role: 'admin',
            });
        }


        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const isMatchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!isMatchedPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.status(200).json({
            isSuccessfully: true,
            message: 'User successfully logged in',
            role: 'user',
            data: existingUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = authRoute;