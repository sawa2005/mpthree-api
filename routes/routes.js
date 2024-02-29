const express = require('express');
const multer = require('multer');
const router = express.Router();
const Model = require('../models/model');
const fs = require("fs");
const path = require('path');

const AWS = require('aws-sdk')
const multerS3 = require('multer-s3');

AWS.config.update({ region: process.env.AWS_S3_BUCKET_REGION })
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

// Set up file upload for multer and AWS S3
const upload = multer({ 
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + Date.now() + ext);
        }
    }),

    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.fieldname;
        let mp3Accepted = true;
        let imgAccepted = true;

        if (name === 'mp3') {
            if (ext === '.mp3') {
                mp3Accepted = true;
            } else {
                mp3Accepted = false;
            }
        }

        if (name === 'image') {
            if (ext === '.jpg') {
                imgAccepted = true;
            } else {
                imgAccepted = false;
            }
        }

        if (mp3Accepted && imgAccepted) {
            mp3Accepted = false;
            imgAccepted = false;

            cb(null, true)
        } else if (mp3Accepted === false || imgAccepted === false) {
            mp3Accepted = false;
            imgAccepted = false;

            cb(new Error('Invalid file format (only mp3 for audio and jpg for images are allowed)'));
        }
    }
});

// GET
router.get('/get-all', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

const fields = [ 
    { name: 'mp3', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]

// POST
router.post('/post', upload.fields(fields), async (req, res) => {
    const time = Date.now();
    const date = new Date(time);

    const mp3 = req.files.mp3[0];
    let image = {};

    if (req.files.image === undefined) {
        image = {path: 'uploads/default.png', filename: 'default.png'}
    } else {
        image = req.files.image[0]
    }

    const data = new Model({
        path: mp3.path,
    
        fileName: mp3.filename,
    
        songName: req.body.songName,
    
        artistName: req.body.artistName,
    
        uploadDate: date,

        uploaderId: req.body.uploaderId,

        imagePath: image.path,

        imageName: image.filename
    })

    try {
        const dataToSave = await data.save();
        res.status(200).redirect('https://slw-mpthree.netlify.app/');
    } catch(error) {
        res.status(400).send(error.message);
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
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// DELETE (ID)
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        const filePath = data.path;
        const imagePath = data.imagePath

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Failed to delete file' });
            } else {
                res.status(200);
            }
        });

        if (imagePath !== 'uploads/default.png') {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Failed to delete image' });
                } else {
                    res.status(200);
                }
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;

/* Set up the storage engine for multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + '-' + Date.now() + ext;
        cb(null, filename);
    }
})

// Set up file upload for multer
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.fieldname;
        let mp3Accepted = true;
        let imgAccepted = true;

        if (name === 'mp3') {
            if (ext === '.mp3') {
                mp3Accepted = true;
            } else {
                mp3Accepted = false;
            }
        }

        if (name === 'image') {
            if (ext === '.jpg') {
                imgAccepted = true;
            } else {
                imgAccepted = false;
            }
        }

        if (mp3Accepted && imgAccepted) {
            mp3Accepted = false;
            imgAccepted = false;

            cb(null, true)
        } else if (mp3Accepted === false || imgAccepted === false) {
            mp3Accepted = false;
            imgAccepted = false;

            cb(new Error('Invalid file format (only mp3 for audio and jpg for images are allowed)'));
        }
    }
}); */