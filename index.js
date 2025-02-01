const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const weddingRoute = require('./routes/weddingRoute');
const loanGuarantier = require('./routes/Guaraniter');
const homeRoute = require('./routes/homeRoute');

const App = express();
const PORT = process.env.PORT || 5000;

App.use(cors());
App.use(express.json());

App.use('/auth', authRoute);
App.use('/wedding', weddingRoute);
App.use('/loan', loanGuarantier);
App.use('/home', homeRoute);


App.get('/', (req, res) => {
    res.send("<h1>Backend is Live! 🚀</h1>");
});

App.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        App.listen(PORT, () => {
            console.log(`DB Connected & Server Running on Port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database Connection Error:", err);
    });
