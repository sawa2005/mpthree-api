const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    path: {
        required: true,
        type: String
    },

    fileName: {
        required: true,
        type: String
    },

    songName: {
        required: true,
        type: String
    },

    artistName: {
        required: true,
        type: String
    },
    
    uploadDate: {
        required: true,
        type: Date
    },

    uploaderId: {
        required: true,
        type: String
    },

    imagePath: {
        required: false,
        type: String
    },

    imageName: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('audio-files', dataSchema);