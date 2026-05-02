const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Notice = require('../models/Notice');
const Event = require('../models/Event');
const Material = require('../models/Material');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all courses
// @route   GET /api/student/courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Apply for admission
// @route   POST /api/student/admission
router.post('/admission', protect, async (req, res) => {
    const { courseId, previousEducation, percentage } = req.body;
    try {
        const admission = await Admission.create({
            student: req.user._id,
            course: courseId,
            previousEducation,
            percentage
        });
        res.status(201).json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all notices
// @route   GET /api/student/notices
router.get('/notices', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all events
// @route   GET /api/student/events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get study materials
// @route   GET /api/student/materials
router.get('/materials', async (req, res) => {
    try {
        const materials = await Material.find().populate('course');
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Submit contact form
// @route   POST /api/student/contact
router.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const contact = await Contact.create({ name, email, subject, message });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
