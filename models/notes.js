const mongoose = require('mongoose');
const notes = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        min: 6,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{timestamps:true});

module.exports = mongoose.model('Note',notes);