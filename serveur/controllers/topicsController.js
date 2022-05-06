const asyncHandler = require("express-async-handler");
const Topic = require("../models/Topic");

//@desc Get category
//@route GET /api/category
//@access Private
const getTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find();
  res.status(200).json(topics);
});







//@desc Delete category
//@route DELETE /api/categories/:id
//@access Private
const deleteTopics = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  await topic.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTopics,
  
  deleteTopics,
  
};
