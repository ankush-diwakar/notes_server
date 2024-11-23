const router = require('express').Router();
const Note = require('../models/notes');
const User = require('../models/user');

//create note
router.post('/addnew', async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            description: req.body.msg,
            postedBy: req.body.postedBy
        })

        const user = await User.findById(req.body.postedBy);
        console.log(user)
        if (user) {
            user.notes.push(note);
            const data = await user.save();
            const data2 = await note.save();
            console.log(data2);
            console.log(data);
        }
        !user ? res.status(404).json({ message: 'Note not created', status: false }) : res.status(200).json({ message: 'Note created successfully', status: true });
    } catch (err) {
        res.status(500).json(err)
    }
})


//update note
router.put('/update/:id', async (req, res) => {
    try {
        
        const note = await Note.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.msg
        })
        !note ? res.status(404).json({ message: 'Note not updated', status: false }) : res.status(200).json({ message: 'Note updated successfully', status: true });
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete note
router.delete('/delete/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        !note ? res.status(404).json({ message: 'Something went wrong or Note does not exists!', status: false }) : res.status(200).json({ message: 'Note deleted successfully', status: true });
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all notes
router.get('/allnotes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ message: 'All notes fetched successfully', status: true, notes: notes });
    } catch (err) {
        res.status(500).json(err)
    }
})


//get note by postedBy id
router.get('/notebyuid/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('notes');
        res.status(200).json({ message: 'All notes fetched successfully', status: true, notes: user.notes });
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;