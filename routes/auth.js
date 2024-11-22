const router = require('express').Router();
const User = require('../models/user');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('notes');
        res.status(200).json({"message": "All users fetched successfully", "status": true, "users": users});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const data = await user.save();
        res.status(200).json(data);
        res.send('User created successfully!');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (!user) {
            res.status(404).json({ message: 'Email or password incorrect!', status: false });
        } else {
            res.status(200).json({ message: 'User logged in successfully!', status: true });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;