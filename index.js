const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();
 
const app = express(); 
 
app.use(express.json());
app.use('/api', routes);

app.listen(3001, () => {
  console.log("Server started at 3001")
})
 
// Set up MongoDB connection 
const url = process.env.URI;

// Connect to database with Mongoose
mongoose.connect(url);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})