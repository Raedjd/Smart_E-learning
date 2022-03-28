import express from 'express';
import mongoose from 'mongoose';
import CourseMessage from '../models/courseMessage.js';

const router = express.Router();

export const getCourses = async (req, res) => { 
    try {
        const courseMessages = await CourseMessage.find();
                
        res.status(200).json(courseMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCourse = async (req, res) => { 
    const { id } = req.params;

    try {
        const course = await CourseMessage.findById(id);
        
        res.status(200).json(course);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCourse = async (req, res) => {
    const { title, teacher, selectedFile, price, tags } = req.body;

    const newCourseMessage = new CourseMessage({ title, teacher, selectedFile, price, tags })

    try {
        await newCourseMessage.save();

        res.status(201).json(newCourseMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, teacher, price, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No such course with this id: ${id}`);

    const updatedCourse = { price, title, teacher, tags, selectedFile, _id: id };

    await CourseMessage.findByIdAndUpdate(id, updatedCourse, { new: true });

    res.json(updatedCourse);
}

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No such course with this id: ${id}`);

    await CourseMessage.findByIdAndRemove(id);

    res.json({ message: "Course deleted successfully." });
}

export const likeCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No such course with this id: ${id}`);
    
    const course = await CourseMessage.findById(id);

    const updatedCourse = await CourseMessage.findByIdAndUpdate(id, { likeCount: course.likeCount + 1 }, { new: true });
    
    res.json(updatedCourse);
}


export default router;