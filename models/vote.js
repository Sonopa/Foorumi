var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    topic: {type: Schema.Types.ObjectId, ref: 'Topic', required: true},
    choice: {type: String, required: true, enum: ['Kyllä', 'Ei']}
}, { timestamps: true });

module.exports = mongoose.model('Vote', VoteSchema);