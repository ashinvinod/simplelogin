var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
    userID: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
var User = mongoose.model('myuser', userSchema);
module.exports = User;
