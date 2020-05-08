const express = require('express');
let middleware = require.main.require('./middleware');

let router = express.Router();

var topicController = require('../controllers/topicController');
var discussionController = require('../controllers/discussionController');
var commentController = require('../controllers/commentController');

// Authentication for modification methods
router.post("*", middleware.checkToken);
router.put("*", middleware.checkToken);
router.delete("*", middleware.checkToken);

// REST API

// Aiheet

// Luo uuden aiheen
router.post('/aiheet', topicController.topic_create_post);

// Palauttaa aiheen id
router.get('/aiheet/:id', topicController.topic_detail_get);

// Palauttaa kaikki aiheet
router.get('/aiheet', topicController.topic_list_get);

// Poistaa aiheen
router.delete("/aiheet/:id", topicController.topic_delete);

// Päivittää aiheen
router.put("/aiheet/:id", topicController.topic_update_put);


// Keskustelut

// Luo uuden keskustelun aiheen topic_id alle
router.post("/aiheet/:topic_id/keskustelut", discussionController.discussion_create_post);

// Palauttaa aiheen topic_id keskustelun id
router.get("/aiheet/:topic_id/keskustelut/:id", discussionController.discussion_detail_get);

// Palauttaa aiheen topic_id keskustelut
router.get("/aiheet/:topic_id/keskustelut", discussionController.discussion_list_for_topic_get);

// Päivittää keskustelun
router.put("/aiheet/:topic_id/keskustelut/:id", discussionController.discussion_update_put);

// Poistaa aiheen topic_id keskustelun id
router.delete("/aiheet/:topic_id/keskustelut/:id", discussionController.discussion_delete);


// Kommentit 

// Luo kommentin keskustelun discussion_id alle
router.post("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit", commentController.comment_create_post);

// Palauttaa keskustelun discussion_id kommentin id
router.get("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit/:id", commentController.comment_detail_get);

// Palauttaa keskustelun discussion_id kommentit
router.get("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit", commentController.comment_list_for_discussion_get);

// Päivittää kommentin
router.put("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit/:id", commentController.comment_update_put);

// Poistaa keskustelun discussion_id kommentin id
router.delete("/aiheet/:topic_id/keskustelut/:discussion_id/kommentit/:id", commentController.comment_delete);


module.exports = router;