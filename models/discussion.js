var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
    topic: {type: Schema.Types.ObjectId, ref: 'Topic', required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, min: 3, max: 100, required: true},
    text: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    creationTime: {type: Date, required: true}
});

module.exports = mongoose.model('Discussion', DiscussionSchema);