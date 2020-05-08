#! /usr/bin/env node
bcrypt = require('bcrypt');
console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Discussion = require('./models/discussion')
var Topic = require('./models/topic')
var Comment = require('./models/comment')
var Vote = require('./models/vote');
var User = require('./models/user');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var topics = []
var discussions = []
var comments = []
var votes = []
var users = []

function topicCreate(title, owner, description, creationTime, voteEndTime, cb) {
  topicdetail = { 
    title: title, 
    owner: owner, 
    description: description, 
    creationTime: creationTime,
    voteEndTime: voteEndTime 
  }
  
  var topic = new Topic(topicdetail);
       
  topic.save(function (err) {
    if (err) {
      cb(err, null)
      return;
    }
    console.log('New Topic: ' + topic);
    topics.push(topic)
    cb(null, topic)
  }  );
}

function discussionCreate(topic, owner, title, text, creationTime, cb) {
  var discussion = new Discussion(
    { 
      topic: topic, 
      owner: owner, 
      title: title, 
      text: text, 
      creationTime: creationTime 
    });
       
  discussion.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New discussion: ' + discussion);
    discussions.push(discussion)
    cb(null, discussion);
  }   );
}

function commentCreate(discussion, owner, text, creationTime, cb) {
  commentdetail = { 
    discussion: discussion, 
    owner: owner, 
    text: text, 
    creationTime: creationTime
  }
    
  var comment = new Comment(commentdetail);    
  comment.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New comment: ' + comment);
    comments.push(comment)
    cb(null, comment)
  }  );
}

function voteCreate(owner, topic, choice, cb) {
    
  var vote = new Vote(
    {
      topic: topic,
      owner: owner,
      choice: choice
    }
  );    
  vote.save(function (err) {
    if (err) {
      console.log('ERROR CREATING vote: ' + vote);
      cb(err, null)
      return
    }
    console.log('New vote: ' + vote);
    votes.push(vote)
    cb(null, vote)
  }  );
}

function userCreate(username, password, cb) {
    
  var user = new User(
    {
      username: username,
      password: password
    }
  );    
  user.save(function (err) {
    if (err) {
      console.log('ERROR CREATING user: ' + user);
      cb(err, null)
      return
    }
    console.log('New user: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

function createUsers(cb) {
  async.parallel([
    function(callback) {
      bcrypt.hash('salasana', 10, function(err, hash) {
        if (err) {
            console.log("Failed to hash password. Reason: " + err);
        } else {
          userCreate('matti', hash, callback);
        }      
      })
    },
    function(callback) {
      bcrypt.hash('salasana', 10, function(err, hash) {
        if (err) {
            console.log("Failed to hash password. Reason: " + err);
        } else {
          userCreate('trolli131', hash, callback);
        }      
      })      
    },
    function(callback) {
      bcrypt.hash('salasana', 10, function(err, hash) {
        if (err) {
            console.log("Failed to hash password. Reason: " + err);
        } else {
          userCreate('jaana', hash, callback);
        }      
      })      
    }
  ], cb);
}

function createTopicsDiscussionsCommentsVotes(cb) {
    async.series([
        function(callback) {
          topicCreate('Suomesta kuningaskunta', users[0], 'Kuningas Sale valtaan!', Date.now(), Date.now()+6000000, callback);
        },
        function(callback) {
          topicCreate('Suomeen kommunismi', users[2], 'Punainen aamu koittaa!', Date.now(), Date.now()+6000000, callback);
        },
        function(callback) {
          topicCreate('Myydään Suomi Venäjälle', users[1], 'Tarvitsen rahaa, en maata.', Date.now(), Date.now()+6000000, callback);
        },
        function(callback) {
          discussionCreate(topics[1], users[0], 'Vain kuolleen ruumiini yli', 'Ja ei muuten varmasti', Date.now(), callback);
        },
        function(callback) {
          commentCreate(discussions[0], users[2], 'Kylläpäs', Date.now(), callback);
        },
        function(callback) {
          voteCreate(users[0], topics[1], 'Ei', callback);
        },
        function(callback) {
          voteCreate(users[2], topics[0], 'Ei', callback);
        },
        function(callback) {
          voteCreate(users[1], topics[2], 'Kyllä', callback);
        }
        ],
        // optional callback
        cb);
}

function addDiscussionCommentAndVoteIds(cb) {
  async.series([
    function(callback) {
      topics[1].discussions.push(discussions[0])
      topics[1].save(function (err) {
        if (err) {
          console.log('ERROR adding discussion id to: ' + topics[1]);
          callback(err, null)
          return
        }
        console.log('Discussion id added to topic');
        callback(null, topics[1])
      }  );
    },
    function(callback) {
      discussions[0].comments.push(comments[0])
      discussions[0].save(function (err) {
        if (err) {
          console.log('ERROR adding comment id to: ' + discussions[0]);
          callback(err, null)
          return
        }
        console.log('Comment id added to discussion');
        callback(null, discussions[0])
      }  );
    },
    function(callback) {
      topics[1].votes.push(votes[0])
      topics[1].save(function (err) {
        if (err) {
          console.log('ERROR adding vote id to: ' + topics[1]);
          callback(err, null)
          return
        }
        console.log('Vote id added to topic');
        callback(null, topics[1])
      }  );
    },
    function(callback) {
      topics[0].votes.push(votes[1])
      topics[0].save(function (err) {
        if (err) {
          console.log('ERROR adding vote id to: ' + topics[0]);
          callback(err, null)
          return
        }
        console.log('Vote id added to topic');
        callback(null, topics[0])
      }  );
    },
    function(callback) {
      topics[2].votes.push(votes[2])
      topics[2].save(function (err) {
        if (err) {
          console.log('ERROR adding vote id to: ' + topics[2]);
          callback(err, null)
          return
        }
        console.log('Vote id added to topic');
        callback(null, topics[2])
      }  );
    }
    ],
    cb);
}

async.series([
    createUsers,
    createTopicsDiscussionsCommentsVotes,
    addDiscussionCommentAndVoteIds
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('DONE');
        mongoose.connection.close();
    }    
});




