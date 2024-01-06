const express = require('express');
const router = express.Router();
const Model = require('../models/model');

module.exports = router;

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
router.post('/post', async (req, res) => {
    const data = new Model({
        path: req.body.path,
    
        fileName: req.body.fileName,
    
        songName: req.body.songName,
    
        artistName: req.body.artistName,
    
        duration: req.body.duration,
    
        uploadDate: req.body.uploadDate
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
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
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with the file name ${data.fileName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})