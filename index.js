const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');


const app = express();

//add middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());


// Import routes
app.use('/api/auth',authRouter);
app.use('/api/note',notesRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});



// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.listen(3000, () => {
    console.log('Server is running on port 8000');
});