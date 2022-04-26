const asyncHandler = require("express-async-handler");
const Badge = require("../models/badgeModel");

//Get all badges
const getBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find();
  res.status(200).json(badges);
});
//
const getBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  res.status(200).json(badge);
});
//Post a badge
const setBadge = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add a name field");
  }

  const badge = await Badge.create({
    name: req.body.name,
    level: req.body.level,
    description: req.body.description,
    color: req.body.color,
    value: req.body.value,
  });
  res.status(200).json(badge);
});

//Delete
const deleteBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  if (!badge) {
    res.status(400);
    throw new Error("Category not found");
  }
  await badge.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBadges,
  setBadge,
  deleteBadge,
  getBadge,
};
