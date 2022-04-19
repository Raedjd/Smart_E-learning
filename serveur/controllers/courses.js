const express = require("express");
const mongoose = require("mongoose");

const CourseMessage = require("../models/courseMessage.js");
const User = require("../models/user.js");


const router = express.Router();

module.exports.getCourses = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await CourseMessage.countDocuments({});
    const courses = await CourseMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: courses,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getCoursesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const courses = await CourseMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: courses });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getCoursesByCreator = async (req, res) => {
  const { name } = req.query;

  try {
    const courses = await CourseMessage.find({ name });

    res.json({ data: courses });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await CourseMessage.findById(id);

    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createCourse = async (req, res) => {
  const course = req.body;

  const newCourseMessage = new CourseMessage({...course,  createdAt: new Date().toISOString(),
  });
  try {
    await newCourseMessage.save();

    res.status(201).json(newCourseMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, price, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No course with id: ${id}`);

  const updatedCourse = {
    creator,
    title,
    description,
    tags,
    price,
    selectedFile,
    _id: id,
  };

  await CourseMessage.findByIdAndUpdate(id, updatedCourse, { new: true });

  res.json(updatedCourse);
};

module.exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No course with id: ${id}`);

  await CourseMessage.findByIdAndRemove(id);

  res.json({ message: "Course deleted successfully." });
};

module.exports.likeCourse = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No course with id: ${id}`);

  const course = await CourseMessage.findById(id);

  const index = course.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    course.likes.push(req.userId);
  } else {
    course.likes = course.likes.filter((id) => id !== String(req.userId));
  }

  const updatedCourse = await CourseMessage.findByIdAndUpdate(id, course, {
    new: true,
  });

  res.status(200).json(updatedCourse);
};

module.exports.commentCourse = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const course = await CourseMessage.findById(id);

  course.comments.push(value);

  const updatedCourse = await CourseMessage.findByIdAndUpdate(id, course, {
    new: true,
  });

  res.json(updatedCourse);
};

// module.exports = router;
