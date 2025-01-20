require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To handle form data

// Check if MONGO_URI is set in environment variables
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MongoDB URI (MONGO_URI) is not set in the .env file!");
  process.exit(1); // Exit if there's no MongoDB URI
}

// MongoDB connection
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
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
          <label for="name">Name:</label><br>
          <input type="text" id="name" name="name" required><br><br>

          <label for="phone">Phone:</label><br>
          <input type="text" id="phone" name="phone" required><br><br>

          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email" required><br><br>

          <label for="address">Address:</label><br>
          <input type="text" id="address" name="address" required><br><br>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

// User creation route (POST request)
app.post('/users', async (req, res) => {
  const { name, phone, email, address } = req.body;

  // Validate request body
  if (!name || !phone || !email || !address) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const user = new User({ name, phone, email, address });
    await user.save(); // Save to MongoDB
    res.status(201).json({ message: 'User saved successfully!', user });

    // Optionally, redirect the user to the home page after saving (this will clear the form)
    res.redirect('/');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user.' });
  }
});

// Graceful shutdown of the server
process.on('SIGINT', () => {
  console.log("Received termination signal. Shutting down...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
