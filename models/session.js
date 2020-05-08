var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    username: {type: String, required: true},
    user_id: {type: String, required: true},
    token: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);