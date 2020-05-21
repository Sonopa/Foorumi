var mongoose = require('mongoose');
var Comment = require('./comment');

var Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
    topic: {type: Schema.Types.ObjectId, ref: 'Topic', required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, min: 3, max: 100, required: true},
    text: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dislikes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true });

DiscussionSchema.pre('deleteOne', function(next) {
    Comment.deleteMany({discussion: this._conditions._id}, function(err) {
        if (err) {
            console.log(err)
            next(err);
        }
    });
    next();
});

module.exports = mongoose.model('Discussion', DiscussionSchema);