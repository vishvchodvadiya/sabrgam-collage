const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['general', 'exam', 'holiday', 'event'], default: 'general' },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
