// const mongoose=require('mongoose')
// const Authencationmodel=mongoose.Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })
// const Auth=mongoose.model('Auth',Audio)
// module.exports=Auth
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
