// const mongoose = require('mongoose');

// const profileSchema = new mongoose.Schema({
//     Name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     Age: {
//         type: Number,
//         required: true
//     },
//     Phoneno: {
//         type: Number,
//         required: true
//     }
// });

// const Profile = mongoose.model('Profile', profileSchema);

// module.exports = Profile;
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Phoneno: {
        type: Number,
        required: true
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
