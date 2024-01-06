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

    duration: {
        required: true,
        type: String
    },

    uploadDate: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model('Data', dataSchema);