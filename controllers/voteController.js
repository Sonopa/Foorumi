var Vote = require('../models/vote');
var User = require('../models/user');
var Topic = require('../models/topic');
const validator = require('express-validator');

exports.vote_create_post = [
    validator.body('choice', 'Choice required').trim().isLength({ min: 1 }),
    validator.param('topic_id', 'Topic id required').trim().isLength({ min: 1 }),

    validator.sanitizeBody('choice').escape(),
    validator.sanitizeParam('topic_id').escape(),
    async (req, res) => {
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error', vote: vote, errors: errors });
        }

        vote = new Vote({
            owner: req.decoded.id,
            topic: req.params.topic_id,
            choice: req.body.choice
        })

        // Find topic and user for the vote
        try {
            topic = await Topic.findById(vote.topic);
        } catch (err) {
            return res.status(500).json({ message: "Failed topic search" + err })
        }

        try {
            user = await User.findById(vote.owner);
        } catch (err) {
            return res.status(500).json({ message: "Failed user search" + err })
        }
        
        if (!user || !topic) {
            return res.status(409).json({ message: "Couldn't find user or topic for voting" })
        }

        // Check if user has already voted on the topic
        if (topic.voters.includes(vote.owner)) { return res.status(403).json({ message: 'User already voted' }) }
        
        topic.votes.push(vote);
        topic.voters.push(vote.owner);
        await topic.save(function(err) {
            if (err) { return res.status(409).json({ message:"Couldn't save vote for topic" }) };
        })

        user.votes.push(vote);
        await user.save(function(err) {
            if (err) { return res.status(409).json({ message:"Couldn't save vote for user" }) };
        })

        vote.save(function(err) {
            if (err) {
                return res.status(409).json({ message: 'Not saved: ' + err });
            }
            return res.status(200).json({ message: 'Vote saved' })       
        })
    }
]

exports.get_vote = function (req, res) {
    Vote.findById(req.params.id, (err, vote) => {
        if (err) { return res.status(409).json({ message: 'Failed vote search: ' + err }) };
        if (!vote) { return res.status(404).json({ message: 'Vote not found' }) };
        return res.status(200).json({ vote })
    })
}

exports.get_votes_for_topic = function (req, res) {
    Vote.find({ topic: req.params.topic_id }, (err, votes) => {
        if (err) { return res.status(409).json({ message: 'Failed vote search: ' + err }) };
        if (!votes) { return res.status(404).json({ message: 'No votes found' }) };
        return res.status(200).json({ votes })        
    })
}