var Comment = require('../models/comment');
var Discussion = require('../models/discussion');
var User = require('../models/user');

const validator = require('express-validator');

// Return a list of all discussion comments on get
exports.comment_list_for_discussion_get = function(req, res) {
    Comment.find({discussion: req.params.discussion_id})
        .exec(function (err, list_comments) {
            if (err) { return res.status(500).json({message: 'Failed comment search: ' + err }) }
            if (!list_comments) { return res.status(404).json({ message: 'Comments not found' }) }
            return res.status(200).json({comment_list: list_comments})
        })
}

// Return single comment on get
exports.comment_detail_get = function(req, res) {
    Comment.findById(req.params.id)
        .exec(function(err, comment) {
            if (err) { return res.status(500).json({message: 'Failed comment search: ' + err }) }
            if (!comment) { return res.status(404).json({ message: 'Comment not found' }) }
            return res.status(200).json({comment: comment})
        });
}

// Create a comment on post
exports.comment_create_post = [
    validator.body('text', 'Text required').trim().isLength({ min: 1 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('text').escape(),

    (req, res) => {
        const errors = validator.validationResult(req);

        var comment = new Comment(
            {
                owner: req.decoded.id,
                text: req.body.text,
                discussion: req.params.discussion_id
            }
        )

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', comment: comment, errors: errors })
        } else {
            comment.save(function (err) {
                if (err) { 
                    console.log('Error saving comment' + err)
                    return res.status(409).json({ message: 'Not saved' })
                }
                discussion = Discussion.findById(req.params.discussion_id, function(err, discussion) {
                    if(err) { return res.status(404).json({ message: 'Discussion not found' }) };
                    discussion.comments.push(comment);
                    discussion.save();
                })
                user = User.findById(comment.owner, function(err, user) {
                    if(err) { return res.status(404).json({ message: 'User not found' }) };
                    user.comments.push(comment);
                    user.save();
                })
                res.status(200).json({ message: 'Comment created' })
            })
        }
    }
]

exports.comment_update_put = [
    validator.body('text', 'Text required').trim().isLength({ min: 1 }),
    //TODO: Add validators/sanitizers

    validator.sanitizeBody('text').escape(),

    (req, res) => {
        const errors = validator.validationResult(req);

        Comment.findById(req.params.id, function (err, comment) {
            if (err) {
                return res.status(500).json({ message: 'Failed comment search: ' + err });
            }
            if (!comment) {
                return res.status(404).json({message: 'Comment not found'});
            }
            if (comment.owner._id != req.decoded.id && req.decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' })
            }

            comment.text = req.body.text || discussion.text;

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation error', comment: comment, errors: errors })
            } else {
                comment.save(function (err) {
                    if (err) { 
                        console.log('Error updating topic' + err)
                        return res.status(409).json({ message: 'Not updated' })
                    }
                    res.status(200).json({ message: 'Comment updated', comment: comment })
                })
            }
        })
    }
]

exports.comment_delete = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return res.status(500).json({ message: 'Failed comment search: ' + err });
        }
        if (!comment) {
            return res.status(404).json({message: 'Comment not found'});
        }
        if (comment.owner._id == req.decoded.id || req.decoded.role === 'admin') {
            Comment.deleteOne({'_id': req.params.id}, function(err) {
                if (err) {
                    return res.status(409).json({message:'Error deleting comment'})
                } else {
                    return res.status(200).json({message:'Comment deleted'})
                }
            })
        } else {
            return res.status(403).json({ message: 'Forbidden' })
        } 
    })
}