// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Body parser middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like styles)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactForm')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Create the Schema and Model for storing user contact info
const contactSchema = new mongoose.Schema({
    email: String,
    phone: String,
    mail: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to serve the contact form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submissions
app.post('/submit', (req, res) => {
    const { email, phone, mail } = req.body;

    const newContact = new Contact({
        email,
        phone,
        mail,
    });

    newContact.save()
        .then(() => {
            res.send('Your contact information has been submitted!');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error submitting your data.');
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
