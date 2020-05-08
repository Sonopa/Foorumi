var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: {type: String, min: 3, max: 100, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    description: {type: String, required: true},
    discussions: [{type: Schema.Types.ObjectId, ref: 'Discussion'}],
    votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}],
    voters: [{type: Schema.Types.ObjectId, ref: 'User'}],
    voteEndTime: {type: Date, required: true}
}, { timestamps: true });


module.exports = mongoose.model('Topic', TopicSchema);