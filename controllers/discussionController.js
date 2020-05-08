var Discussion = require('../models/discussion');
var Topic = require('../models/topic');
var User = require('../models/user');

const validator = require('express-validator');

// Return a list of all topic discussions on get
exports.discussion_list_for_topic_get = function(req, res) {
    Discussion.find({topic: req.params.topic_id})
        .exec(function (err, list_discussions) {
            if (err) { return res.status(404).json({ message: 'Discussions not found' }) }
            return res.status(200).json({discussion_list: list_discussions})
        })
}

// Return single discussion on get
exports.discussion_detail_get = function(req, res) {
    Discussion.findById(req.params.id)
        .exec(function(err, discussion) {
            if (err) { return res.status(404).json({message: 'Discussion not found'}) }
            return res.status(200).json({discussion: discussion})
        });
}

// Create Discussion on post
exports.discussion_create_post = [
    validator.body('title', 'Title required').trim().isLength({ min: 1 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('title').escape(),

    (req, res) => {
        const errors = validator.validationResult(req);

        var discussion = new Discussion(
            {
                title: req.body.title,
                owner: req.decoded.id,
                text: req.body.text,
                topic: req.params.topic_id,
                comments: [],
            }
        )

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', discussion: discussion, errors: errors })
        } else {
            discussion.save(function (err) {
                if (err) { 
                    console.log('Error saving discussion' + err)
                    return res.status(409).json({ message: 'Not saved' })
                }
                topic = Topic.findById(req.params.topic_id, function(err, topic) {
                    if(err) { return res.status(404).json({ message: 'Topic not found' }) };
                    topic.discussions.push(discussion);
                    topic.save();
                })
                user = User.findById(discussion.owner, function(err, user) {
                    if(err) { return res.status(404).json({ message: 'User not found' }) };
                    user.discussions.push(discussion);
                    user.save();
                })
                res.status(200).json({ message: 'Discussion created' })
            })
        }
    }
]

exports.discussion_update_put = [
    validator.body('title', 'Title required').trim().isLength({ min: 1 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('title').escape(),

    (req, res) => {
        const errors = validator.validationResult(req);

        Discussion.findById(req.params.id, function (err, discussion) {
            if (err) {
                console.log('Error finding discussion to update');
                return res.status(404).json({ message: 'Discussion not found' })
            }
            if (discussion.owner._id != req.decoded.id) {
                return res.status(403).json({ message: 'Forbidden' })
            }

            discussion.title = req.body.title || discussion.title;
            discussion.text = req.body.text || discussion.text;

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation error', discussion: discussion, errors: errors })
            } else {
                discussion.save(function (err) {
                    if (err) { 
                        console.log('Error updating topic' + err)
                        return res.status(409).json({ message: 'Not updated' })
                    }
                    res.status(200).json({ message: 'Discussion updated', discussion: discussion })
                })
            }
        })
    }
]

exports.discussion_delete = function(req, res) {
    Discussion.findById(req.params.id, function(err, discussion) {
        if (err) {
            console.log('Error finding discussion to delete');
            return res.status(404).json({ message: 'Discussion not found' })
        }
        if (discussion.owner._id == req.decoded.id) {
            Discussion.deleteOne({'_id': req.params.id}, function(err) {
                if (err) {
                    return res.status(409).json({message:'Error deleting discussion'})
                } else {
                    return res.status(200).json({message:'Discussion deleted'})
                }
            })
        } else {
            return res.status(403).json({ message: 'Forbidden' })
        } 
    })
}
