const express = require('express');
let middleware = require.main.require('./middleware');

let router = express.Router();

// Temp database
let topicDatabase = [];
let discussionDatabase = [];
let commentDatabase = [];

let topic_id = 1;
let discussion_id = 1;
let comment_id = 1;

// Authentication for post methods
router.post("*", middleware.checkToken);

// REST API

// Aiheet

// Luo uuden aiheen
router.post("/aiheet", function(req, res) {
    let datetime = new Date();
    let topic = {
        id:topic_id,
        owner:req.body.owner,
        title:req.body.title,
        description:req.body.description,
        discussions:[],
        votesFor:0,
        votesAgainst:0,
        creationTime:datetime
    }
    topicDatabase.push(topic);
    topic_id++;
    return res.status(200).json({message:"Topic added successfully"});
});

// Palauttaa aiheen id
router.get("/aiheet/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < topicDatabase.length; i++) {
        if (tempId === topicDatabase[i].id) {
            return res.status(200).json(topicDatabase[i]);
        }
    }
});

// Palauttaa kaikki aiheet
router.get("/aiheet", function(req, res) {
    return res.status(200).json(topicDatabase);
});

router.delete("/aiheet/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < topicDatabase.length; i++) {
        if (tempId === topicDatabase[i].id) {
            topicDatabase.splice(i,1);
            return res.status(200).json({message:"Topic deleted"});
        }
    }
});

// Keskustelut

// Luo uuden keskustelun aiheen topic_id alle
router.post("/aiheet/:topic_id/keskustelut", function(req, res) {

    let datetime = new Date();
    topicId = parseInt(req.params.topic_id, 10);
    let discussion = {
        id:discussion_id,
        topic:topicId,
        owner:req.body.owner,
        title:req.body.title,
        text:req.body.text,
        comments:[],
        creationTime:datetime
    }
    console.log(req.body)
    for (let i = 0; i < topicDatabase.length; i++) {
        if (topicDatabase[i].id === discussion.topic) {
            topicDatabase[i].discussions.push(discussion)
        }
    }
    discussionDatabase.push(discussion);
    discussion_id++;
    return res.status(200).json({message:"Discussion added successfully"});
});

// Palauttaa aiheen topic_id keskustelun id
router.get("/aiheet/:topic_id/keskustelut/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < discussionDatabase.length; i++) {
        if (tempId === discussionDatabase[i].id) {
            return res.status(200).json(discussionDatabase[i]);
        }
    }
});

// Palauttaa aiheen topic_id keskustelut
router.get("/aiheet/:topic_id/keskustelut", function(req, res) {
    topicDiscussions = []
    for (let i = 0; i < discussionDatabase.length; i++) {
        if (discussionDatabase[i].topic === parseInt(req.params.topic_id, 10)) {
            topicDiscussions.push(discussionDatabase[i]);
        }
    }
    return res.status(200).json(topicDiscussions);
});

// Poistaa aiheen topic_id keskustelun id
router.delete("/aiheet/:topic_id/keskustelut/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < discussionDatabase.length; i++) {
        if (tempId === discussionDatabase[i].id) {
            discussionDatabase.splice(i,1);
            return res.status(200).json({message:"Discussion deleted"});
        }
    }
});

// Kommentit 

// Luo kommentin keskustelun discussion_id alle
router.post("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit", function(req, res) {
    let datetime = new Date();
    discussionId = parseInt(req.params.discussion_id, 10);
    let comment = {
        id:comment_id,
        discussion:discussionId,
        owner:req.body.owner,
        text:req.body.text,
        creationTime:datetime
    }
    for (let i = 0; i < discussionDatabase.length; i++) {
        if (discussionDatabase[i].id === comment.discussion) {
            discussionDatabase[i].comments.push(comment)
        }
    }
    commentDatabase.push(comment);
    comment_id++;
    return res.status(200).json({message:"Comment added successfully"});
});

// Palauttaa keskustelun discussion_id kommentin id
router.get("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < commentDatabase.length; i++) {
        if (tempId === commentDatabase[i].id) {
            return res.status(200).json(commentDatabase[i]);
        }
    }
});

// Palauttaa keskustelun discussion_id kommentit
router.get("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit", function(req, res) {
    discussionComments = []
    for (let i = 0; i < commentDatabase.length; i++) {
        if (commentDatabase[i].topic === parseInt(req.params.discussion_id, 10)) {
            discussionComments.push(commentDatabase[i]);
        }
    }
    return res.status(200).json(discussionComments);
});

// Poistaa keskustelun discussion_id kommentin id
router.delete("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < commentDatabase.length; i++) {
        if (tempId === commentDatabase[i].id) {
            commentDatabase.splice(i,1);
            return res.status(200).json({message:"Comment deleted"});
        }
    }
});

module.exports = router;