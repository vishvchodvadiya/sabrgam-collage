const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    previousEducation: String,
    percentage: Number,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    appliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
