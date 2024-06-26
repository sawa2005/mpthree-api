const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors');

dotenv.config();
 
const app = express();

app.use(cors());
 
app.use(express.json());
app.use('/api', routes);
// app.use(express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
 
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