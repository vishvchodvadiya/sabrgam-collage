const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    fileUrl: { type: String, required: true },
    type: { type: String, enum: ['pdf', 'video', 'doc'], default: 'pdf' }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
