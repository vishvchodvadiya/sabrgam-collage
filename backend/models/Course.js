const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: String,
    description: { type: String, required: true },
    details: String,
    eligibility: String,
    category: { type: String, required: true },
    duration: String,
    fee: Number,
    instructor: String,
    thumbnail: String
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
