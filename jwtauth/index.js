const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const userrouter=require('./router/authuser')


const cors = require('cors');
app.use(cors());


app.use(express.json());

mongoose.connect('mongodb+srv://smdshafi1414:Shaik12@cluster0.4ymuf.mongodb.net/jwtauth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/auth',userrouter)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
