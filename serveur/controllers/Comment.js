const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment');




router.post('/create', async (req, res) => {
    const {content, userId, topicId} = req.body;

    const newComment = Comment({
        content,
        createdAt: Date.now(),
        topicId,
        userId

    });
    

    await newComment.save();
    res.send(newComment);
});



router.get('/topic/:id', async (req, res) => {
    const page = req.query.page;
    const perPage = 10;
    const comments = await Comment.find({topicId: req.params.id}).limit(perPage).skip(perPage * (page - 1));
    res.send(comments);
});




module.exports = router;