const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    loggedInStatus: { type: Boolean },
    userName: { type: String },
    profilePic: { type: String },
});

module.exports = mongoose.model('user', userSchema);
