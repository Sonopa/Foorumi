var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    discussion:{type: Schema.Types.ObjectId, ref:'Discussion', required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    creationTime: {type: Date, required: true}
})

module.exports = mongoose.model('Comment', CommentSchema);