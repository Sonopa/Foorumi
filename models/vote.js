var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    topic: {type: Schema.Types.ObjectId, ref: 'Topic', required: true},
    choice: {type: Number, required: true}
});

module.export = mongoose.model('Vote', VoteSchema);