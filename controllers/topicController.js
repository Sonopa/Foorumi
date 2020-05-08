var Topic = require('../models/topic');
var User = require('../models/user');
var Discussion = require('../models/discussion');
var Vote = require('../models/vote');

const validator = require('express-validator');

// Return a list of all topics on get
exports.topic_list_get = function(req, res) {
    Topic.find()
        .populate('owner', '_id username name')
        .populate('discussions', '_id title')
        .populate('votes', '_id choice')
        .exec(function (err, list_topics) {
            if (err) { return res.status(404).json({message: 'Topic not found'}) }
            return res.status(200).json({topic_list: list_topics})
        })
}

// Return single topic on get
exports.topic_detail_get = function(req, res) {
    Topic.findById(req.params.id)
        .populate('owner', '_id username name')
        .populate('discussions', '_id title')
        .populate('votes', '_id choice')
        .exec(function(err, topic) {
            if (err) { return res.status(404).json({message: 'Topic not found'}) }
            return res.status(200).json({topic_detail: topic})
        });
}

// Create Topic on post
exports.topic_create_post = [
    validator.body('title', 'Title required').trim().isLength({ min: 1 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('title').escape(),

    (req, res) => {
        const errors = validator.validationResult(req);

        var topic = new Topic(
            {
                title: req.body.title,
                owner: req.decoded.id,
                description: req.body.description,
                discussions: [],
                votes: [],
                voters: [],
                voteEndTime: req.body.voteEndTime
            }
        )

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', topic: topic, errors: errors })
        } else {
            topic.save(function (err) {
                if (err) { 
                    console.log('Error saving topic' + err)
                    return res.status(409).json({message: 'Not saved'})
                }
                user = User.findById(topic.owner, function(err, user) {
                    if(err) { return res.status(404).json({ message: 'User not found' }) };
                    user.topics.push(topic);
                    user.save();
                })
                res.status(200).json({ message: 'Topic created' })
            })
        }
    }
]

exports.topic_update_put = [
    validator.body('title', 'Title required').trim().isLength({ min: 1 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('title').escape(),

    (req, res) => {
        const errors = validator.validationResult(req);

        Topic.findById(req.params.id, function (err, topic) {
            if (err) {
                console.log('Error finding topic to update');
                return res.status(404).json({ message: 'Topic not found' })
            }
            if (topic.owner._id != req.decoded.id) {
                return res.status(403).json({ message: 'Forbidden' })
            }

            topic.title = req.body.title || topic.title;
            topic.description = req.body.description || topic.description;
            topic.voteEndTime = req.body.voteEndTime || topic.voteEndTime;

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation error', topic: topic, errors: errors })
            } else {
                topic.save(function (err) {
                    if (err) { 
                        console.log('Error updating topic' + err)
                        return res.status(409).json({ message: 'Not updated' })
                    }
                    res.status(200).json({ message: 'Topic updated', topic: topic })
                })
            }
        })
    }
]

exports.topic_delete = function(req, res) {
    Topic.findById(req.params.id, function(err, topic) {
        if (err) {
            console.log('Error finding topic to delete');
            return res.status(404).json({ message: 'Topic not found' })
        }
        if (topic.owner._id == req.decoded.id) {
            Topic.deleteOne({'_id': req.params.id}, function(err) {
                if (err) {
                    return res.status(409).json({message:'Error deleting topic'})
                } else {
                    return res.status(200).json({message:'Topic deleted'})
                }
            })
        } else {
            return res.status(403).json({ message: 'Forbidden' })
        } 
    })
}
