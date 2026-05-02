import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, GraduationCap, Laptop, BarChart, Award } from 'lucide-react'

const getIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'commerce': return BarChart;
    case 'management': return GraduationCap;
    case 'computer': return Laptop;
    default: return BookOpen;
  }
}

const CoursesSection = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/student/courses')
        setCourses(data)
      } catch (err) {
        console.error("Error fetching courses:", err)
      }
    }
    fetchCourses()
  }, [])

  return (
    <section className="relative py-20 overflow-hidden rounded-[4rem] mx-4 lg:mx-10 my-20">
      {/* Background with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
          alt="Library Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white/40 to-slate-50/80 dark:from-slate-950/80 dark:via-slate-950/40 dark:to-slate-950/80 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Courses <span className="text-primary-600">Offered</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full mb-4" />
          <div className="flex justify-center gap-1">
            <div className="w-1 h-1 bg-primary-600 rounded-full" />
            <div className="w-8 h-1 bg-primary-600 rounded-full" />
            <div className="w-1 h-1 bg-primary-600 rounded-full" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCourse(course)}
              className={`cursor-pointer group relative bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border-2 border-transparent hover:border-primary-600/30 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none ${course.fullWidth ? 'md:col-span-2' : ''}`}
            >
              {/* Top Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-t-2xl opacity-80" />
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {React.createElement(getIcon(course.category), { size: 32 })}
                </div>
                <h3 className="text-3xl font-bold font-serif text-slate-800 dark:text-white">{course.title}</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  {course.subtitle}
                </p>
                <div className="pt-4 h-1.5 w-12 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:w-20 group-hover:bg-primary-600 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Course Details */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-600 to-indigo-600" />
              
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-10 md:p-14 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-primary-600 mb-2">
                    {React.createElement(getIcon(selectedCourse.category), { size: 28 })}
                    <span className="text-sm font-bold tracking-[0.2em] uppercase">Course Overview</span>
                  </div>
                  <h3 className="text-5xl font-black text-slate-900 dark:text-white">{selectedCourse.title}</h3>
                  <p className="text-slate-500 font-medium">{selectedCourse.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                    <p className="text-xl font-bold">{selectedCourse.duration}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Eligibility</p>
                    <p className="text-xl font-bold">{selectedCourse.eligibility}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold">About the Program</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    {selectedCourse.details}
                  </p>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => {
                      setSelectedCourse(null)
                      window.location.href = `/admission?courseId=${selectedCourse._id}`
                    }}
                    className="w-full bg-primary-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-[0.98]"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CoursesSection
