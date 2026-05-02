const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Course = require('../models/Course');
const { protect, admin } = require('../middleware/authMiddleware');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// @desc    AI Chatbot for student queries
// @route   POST /api/ai/chat
router.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an AI assistant for Sargam College. Answer queries about admissions, courses, and college life." },
                { role: "user", content: message }
            ],
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: "AI Error: " + error.message });
    }
});

// @desc    AI Course Recommendation
// @route   POST /api/ai/recommend
router.post('/recommend', protect, async (req, res) => {
    try {
        const user = req.user;
        const courses = await Course.find();
        const courseList = courses.map(c => `${c.title}: ${c.description}`).join('\n');

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an academic advisor. Based on student interests, recommend the best courses from the provided list." },
                { role: "user", content: `My interests are: ${user.interests.join(', ')}. Here are the courses available:\n${courseList}\nRecommend 2 courses.` }
            ],
        });
        res.json({ recommendation: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: "AI Recommendation Error: " + error.message });
    }
});

// @desc    AI Notice Generator (Admin tool)
// @route   POST /api/ai/generate-notice
router.post('/generate-notice', protect, admin, async (req, res) => {
    const { topic } = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an administrative assistant. Generate a formal college notice based on the topic." },
                { role: "user", content: `Generate a notice about: ${topic}` }
            ],
        });
        res.json({ content: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: "AI Notice Error: " + error.message });
    }
});

module.exports = router;
