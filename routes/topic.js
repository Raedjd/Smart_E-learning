const router = require("express").Router();
const topicController = require("../controllers/topic");



router.post("/add-topic",topicController.addTopic)




module.exports = router;