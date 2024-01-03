const express = require('express'); 
const multer = require('multer');
const mongoose = require('mongoose'); 
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();
 
const app = express(); 
 
app.use(express.json());
app.use('/api', routes);

app.listen(3000, () => {
  console.log("Server started at 3000")
})

// Set up the storage engine for multer 
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }); 
 
// Set up MongoDB connection 
const url = process.env.URI;
const dbName = 'mpthree';

// Connect to database with Mongoose
mongoose.connect(url);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

/* app.post('/', upload.single('audioFile'), (req, res) => { 
  const file = req.file.buffer; 
  const name = req.file.originalname; 
 
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => { 
    if (err) throw err; 
 
    const db = client.db(dbName); 
 
    db.collection('audio-files').insertOne({ fileName: name, data: file, songName: "Test", artistName: "John Doe", duration: "0:00", uploadDate: "2022-02-02" }, (err, result) => { 
      if (err) throw err; 
 
      console.log('File uploaded to MongoDB!'); 
      res.redirect('/'); 
    }); 
  }); 
}); */