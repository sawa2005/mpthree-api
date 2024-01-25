const express = require('express');
const multer = require('multer');
const router = express.Router();
const Model = require('../models/model');
const fs = require("fs");

// Set up the storage engine for multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + '.mp3';
        cb(null, filename);
    }
})
  
const upload = multer({ storage: storage });

// GET
router.get('/get-all', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// POST
router.post('/post', upload.single('mp3'), async (req, res) => {
    const time = Date.now();
    const date = new Date(time);

    const data = new Model({
        path: req.file.path,
    
        fileName: req.file.filename,
    
        songName: req.body.songName,
    
        artistName: req.body.artistName,
    
        uploadDate: date
    })

    try {
        const dataToSave = await data.save();
        // res.status(200).json(dataToSave);
        res.redirect('/');
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

// GET (ID)
router.get('/get-one/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// UPDATE (ID)
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// DELETE (ID)
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        const filePath = data.path;

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Failed to delete file' });
            }

            else {
                res.status(200);
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;