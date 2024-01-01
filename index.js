const express = require('express'); 
const multer = require('multer'); 
const MongoClient = require('mongodb').MongoClient;

import * as dotenv from 'dotenv';

dotenv.config();
 
const app = express(); 
 
// Set up the storage engine for multer 
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }); 
 
// Set up MongoDB connection 
const url = process.env.URI;
const dbName = 'mpthree'; 

app.post('/upload', upload.single('audio'), (req, res) => { 
  const file = req.file.buffer; 
  const fileName = req.file.originalname; 
 
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => { 
    if (err) throw err; 
 
    const db = client.db(dbName); 
 
    db.collection('audio-files').insertOne({ name: fileName, data: file }, (err, result) => { 
      if (err) throw err; 
 
      console.log('File uploaded to MongoDB!'); 
      res.redirect('/'); 
    }); 
  }); 
}); 