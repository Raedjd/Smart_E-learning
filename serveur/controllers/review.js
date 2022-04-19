const express = require("express");
const mongoose = require("mongoose");

const CourseMessage = require("../models/courseMessage.js");

const reviewModel = require("../models/reviewModel.js");

const router = express.Router();

module.exports.getReviews = async (req, res) => {
  try {
    const reviewModels = await reviewModel.find();

    res.status(200).json(reviewModels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await reviewModel.findById(id);

    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createReview = async (req, res) => {
  const review = req.body;
  let reviewCourse = { title: review.title, text: review.text };
  const id = req.body.course;

  const newReview = new reviewModel({
    ...review,
    createdAt: new Date().toISOString(),
  });

  try {
    await newReview.save();
    const courseById = await CourseMessage.findById(id);

    courseById.reviews.push(reviewCourse);
    // console.log(courseById.reviews)

    await courseById.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// module.exports.createReview = async (req, res) => {
//     const review=new reviewModel({
//         title:req.body.title,
//         text:req.body.text,
//         rate:req.body.rate
//     })

//     // const newreviewModel = new reviewModel({ ...review, creator: req.userId, createdAt: new Date().toISOString() })

//     try {
//         const newReview = await review.save()
//         res.status(201).json(newReview)
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

module.exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { title, text, creator, rate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No review with id: ${id}`);

  const updatedReview = { title, text, creator, rate, _id: id };

  await reviewModel.findByIdAndUpdate(id, updatedReview, { new: true });

  res.json(updatedReview);
};

module.exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No review with id: ${id}`);

  await reviewModel.findByIdAndRemove(id);

  res.json({ message: "Review deleted successfully." });
};
