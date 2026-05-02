require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const courses = [
    {
        title: 'B.Com.',
        subtitle: '(BACHELOR OF COMMERCE - ENGLISH / GUJARATI MEDIUM)',
        description: 'Bachelor of Commerce with focus on Accounting and Finance.',
        details: 'Our B.Com program offers a comprehensive understanding of accounting, finance, and business management. Available in both English and Gujarati mediums to cater to diverse student needs.',
        eligibility: '12th Pass (Any Stream)',
        category: 'Commerce',
        duration: '3 Years',
        fee: 40000,
        instructor: 'Prof. Mehta'
    },
    {
        title: 'BBA',
        subtitle: '(BACHELOR OF BUSINESS ADMINISTRATION)',
        description: 'Prepare for leadership roles in business and entrepreneurship.',
        details: 'The BBA program focuses on developing leadership and management skills. It prepares students for a successful career in corporate management and entrepreneurship.',
        eligibility: '12th Pass (Any Stream)',
        category: 'Management',
        duration: '3 Years',
        fee: 45000,
        instructor: 'Prof. Desai'
    },
    {
        title: 'BCA',
        subtitle: '(BACHELOR OF COMPUTER APPLICATIONS)',
        description: 'Foundation in computer science and software development.',
        details: 'BCA provides a strong foundation in computer science and software development. Students learn programming, database management, and web technologies.',
        eligibility: '12th Pass (Science/Commerce with Maths/Stats/CS)',
        category: 'Computer',
        duration: '3 Years',
        fee: 50000,
        instructor: 'Dr. Shah'
    },
    {
        title: 'M.Com.',
        subtitle: '(MASTER OF COMMERCE)',
        description: 'Postgraduate degree in advanced commerce subjects.',
        details: 'M.Com is a postgraduate degree focusing on advanced commerce subjects. It is ideal for students aiming for careers in research, teaching, or high-level finance.',
        eligibility: 'Graduation in Commerce',
        category: 'Commerce',
        duration: '2 Years',
        fee: 60000,
        instructor: 'Dr. Trivedi'
    }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to DB');
        await Course.deleteMany({});
        await Course.insertMany(courses);
        console.log('Courses Added!');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
