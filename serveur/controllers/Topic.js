const express = require("express");
const router = express.Router();
const Topic = require('../models/Topic');




router.post('/create', async (req, res) => {
    const {title, content, userId, forumId} = req.body;

    const newTopic = Topic({
        title,
        content,
        createdAt: Date.now(),
        forumId,
        userId

    });
    

    await newTopic.save();
    res.send(newTopic);
});

router.get('/:id', async (req, res) => {
    const topic = await Topic.findById(req.params.id);
    if(!topic) {
        res.status(404).send({
            message: 'Topic not found' 
        });
        return;
    }
    res.send(topic);
})

router.get('/forum/:id', async (req, res) => {
    const topics = await Topic.find({forumId: req.params.id});
    res.send(topics);
});




module.exports = router;