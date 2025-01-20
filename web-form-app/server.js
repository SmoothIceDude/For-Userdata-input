require('dotenv').config(); // Load environment variables 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { exec } = require('child_process'); // For running shell commands

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To handle form data

// Ensure MONGO_URI is set in the .env file and use MongoDB Atlas URI
const mongoUri = process.env.MONGO_URI;

// Run npm audit fix --force to address vulnerabilities during startup
exec('npm audit fix --force', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing npm audit fix: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.log('npm audit fix --force completed successfully.');
});

// MongoDB connection
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true }, // New field
});

const User = mongoose.model('User', userSchema);

// Root route to display the form
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>User Form</title>
      </head>
      <body>
        <h1>Enter User Information</h1>
        <form action="/users" method="POST">
          <label for="firstName">First Name:</label><br>
          <input type="text" id="firstName" name="firstName" required><br><br>

          <label for="lastName">Last Name:</label><br>
          <input type="text" id="lastName" name="lastName" required><br><br>

          <label for="phone">Phone:</label><br>
          <input type="text" id="phone" name="phone" required><br><br>

          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email" required><br><br>

          <label for="address">Address:</label><br>
          <input type="text" id="address" name="address" required><br><br>

          <label for="emergencyContact">Emergency Contact:</label><br>
          <input type="text" id="emergencyContact" name="emergencyContact" required><br><br>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

// User creation route (POST request)
app.post('/users', async (req, res) => {
  const { firstName, lastName, phone, email, address, emergencyContact } = req.body;

  // Validate request body
  if (!firstName || !lastName || !phone || !email || !address || !emergencyContact) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const user = new User({ firstName, lastName, phone, email, address, emergencyContact });
    await user.save(); // Save to MongoDB
    res.status(201).json({ message: 'User saved successfully!', user });

    // Optionally, redirect the user to the home page after saving (this will clear the form)
    res.redirect('/');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
