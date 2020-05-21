var mongoose = require('mongoose');
var Discussion = require('./discussion');

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

TopicSchema.pre('deleteOne', function(next) {
    Discussion.find({topic: this._conditions._id}, function(err, discussions) {
        if (err) {
            console.log(err);
            next(err);
        }

        for (i = 0; i < discussions.length; i++) {
            Discussion.deleteOne(discussions[i], function (err, result) {
                if(err) {
                    console.log(err)
                    next(err);
                }
                console.log(result)
            })
        }
    })
    next();
});

module.exports = mongoose.model('Topic', TopicSchema);