// This example uses express to handle HTTP requests and mongoose to interact with MongoDB. It defines a User model, which consists of a name and an age, and implements CRUD operations for this model.

// Note: This is just a basic example to demonstrate how to use Mongoose and Express for CRUD operations, and it may not cover all edge cases or include all best practices.

const express = require('express');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });

// Define the model
const User = mongoose.model('User', { name: String, age: Number });

// Initialize the express app
const app = express();

// Handle incoming POST requests
app.post('/users', async (req, res) => {
  const user = new User({ name: req.body.name, age: req.body.age });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Handle incoming GET requests
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Handle incoming PUT requests
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Handle incoming DELETE requests
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
