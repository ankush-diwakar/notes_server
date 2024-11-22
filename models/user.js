const mongoose = require('mongoose');
const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:4,
        max:30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Note'
        }
    ]
},{timestamps:true});

module.exports = mongoose.model('User',user);