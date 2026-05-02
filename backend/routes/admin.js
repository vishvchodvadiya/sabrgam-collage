const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const Admission = require('../models/Admission');
const Notice = require('../models/Notice');
const Event = require('../models/Event');
const Material = require('../models/Material');
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/authMiddleware');

// Use protect and admin middleware for all routes
router.use(protect);
router.use(admin);

// --- Course Management ---
router.post('/courses', async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/courses/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Student Management ---
router.get('/students', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Admission Management ---
router.get('/admissions', async (req, res) => {
    try {
        const admissions = await Admission.find().populate('student course');
        res.json(admissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/admissions/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const admission = await Admission.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Notice Management ---
router.post('/notices', async (req, res) => {
    try {
        const notice = await Notice.create(req.body);
        res.status(201).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Contact Messages ---
router.get('/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
