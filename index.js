const express = require("express");
const bodyParser = require("body-parser");

let app = express();
let port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Temp database
let topic_id = 1;
let discussion_id = 1;
let comment_id = 1;
let user_id = 1;
let topicDatabase = [];
let discussionDatabase = [];
let commentDatabase = [];

// USER DB
const users = [];

// SESSION MANAGEMENT

const loggedSessions = [];
const time_to_live = 1000*60*5;

// LOGIN API

app.post("/register", function(req, res) {
    if (!req.body) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (req.body.username.length < 3 || req.body.password.length < 8) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    for (let i = 0; i < users.length; i++) {
        if (req.body.username === users[i].username) {
            return res.status(409).json({message:"Username not available"})
        }
    }

    let user = {
        id: user_id,
        username:req.body.username,
        password:req.body.password,
        name:req.body.name
    }
    users.push(user);
    user_id++;
    return res.status(200).json({message:"Registration successful"})
})

app.post("/login", function(req, res) {
    if (!req.body) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    if (req.body.username.length < 3 || req.body.password.length < 8) {
        return res.status(422).json({message:"Missing valid credentials"})
    }
    for (let i = 0; i < users.length; i++) {
        if (req.body.username === users[i].username && req.body.password === users[i].password) {
            let session = {
                id: users[i].id,
                username: users[i].username
            }
            loggedSessions.push(session)
            return res.status(200).json({message:"Login successful"})
        }
    }
    return res.status(403).json({message:"Failed login"})
})

app.post("/logout", function(req, res) {
    let username = req.body.username;
    for (let i = 0; i < loggedSessions.length; i++) {
        if (username === loggedSessions[i].username) {
            loggedSessions.splice(i, 1);
            return res.status(200).json({message:"Logged out"})
        }
    }
    return res.status(404).json({message:"Session not found"})
})

// REST API

// Aiheet

// Luo uuden aiheen
app.post("/api/aiheet", function(req, res) {
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
app.get("/api/aiheet/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < topicDatabase.length; i++) {
        if (tempId === topicDatabase[i].id) {
            return res.status(200).json(topicDatabase[i]);
        }
    }
});

// Palauttaa kaikki aiheet
app.get("/api/aiheet", function(req, res) {
    return res.status(200).json(topicDatabase);
});

app.delete("/api/aiheet/:id", function(req, res) {
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
app.post("/api/aiheet/:topic_id/keskustelut", function(req, res) {
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
app.get("/api/aiheet/:topic_id/keskustelut/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < discussionDatabase.length; i++) {
        if (tempId === discussionDatabase[i].id) {
            return res.status(200).json(discussionDatabase[i]);
        }
    }
});

// Palauttaa aiheen topic_id keskustelut
app.get("/api/aiheet/:topic_id/keskustelut", function(req, res) {
    topicDiscussions = []
    for (let i = 0; i < discussionDatabase.length; i++) {
        if (discussionDatabase[i].topic === req.params.topic_id) {
            topicDiscussions.push(discussionDatabase[i]);
        }
    }
    return res.status(200).json(topicDiscussions);
});

// Poistaa aiheen topic_id keskustelun id
app.delete("/api/aiheet/:topic_id/keskustelut/:id", function(req, res) {
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
app.post("/api/aiheet/:topic_id/keskustelut/:discussion_id/kommentit", function(req, res) {
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
app.get("/api/aiheet/:topic_id/keskustelut/:discussion_id/kommentit:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < commentDatabase.length; i++) {
        if (tempId === commentDatabase[i].id) {
            return res.status(200).json(commentDatabase[i]);
        }
    }
});

// Palauttaa keskustelun discussion_id kommentit
app.get("/api/aiheet/:topic_id/keskustelut/:discussion_id/kommentit", function(req, res) {
    discussionComments = []
    for (let i = 0; i < commentDatabase.length; i++) {
        if (commentDatabase[i].topic === req.params.discussion_id) {
            discussionComments.push(commentDatabase[i]);
        }
    }
    return res.status(200).json(discussionComments);
});

// Poistaa keskustelun discussion_id kommentin id
app.delete("/api/aiheet/:topic_id/keskustelut/:discussion_id/kommentit/:id", function(req, res) {
    let tempId = parseInt(req.params.id, 10);
    for (let i = 0; i < commentDatabase.length; i++) {
        if (tempId === commentDatabase[i].id) {
            commentDatabase.splice(i,1);
            return res.status(200).json({message:"Comment deleted"});
        }
    }
});

app.listen(port);

console.log("Running on port " + port);