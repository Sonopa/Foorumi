var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, min: 3, max: 16, unique: true},
    password: {type: String, required:true, min:8},
    name: {type: String, min: 1, max: 50},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    discussions: [{type: Schema.Types.ObjectId, ref: 'Discussion'}],
    topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
    votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}],
});

module.export = mongoose.model('User', UserSchema);