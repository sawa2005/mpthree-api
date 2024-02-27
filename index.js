const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors');

dotenv.config();
 
const app = express(); 
 
app.use(express.json());
app.use('/api', routes);
app.use(express.static('uploads'));
app.use(cors());

app.listen(3001, () => {
  console.log("Server started at 3001")
})
 
// Set up MongoDB connection 
const url = process.env.MONGODB_URI;

/* Alt. Local connection
const url = process.env.LOCAL_URI; */

// Connect to database with Mongoose
mongoose.connect(url);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})