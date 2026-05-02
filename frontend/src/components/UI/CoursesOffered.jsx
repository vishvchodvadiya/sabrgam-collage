import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, Code, Briefcase, Award, X, CheckCircle2 } from 'lucide-react'

const courses = [
  { 
    title: "B.Com.", 
    sub: "(BACHELOR OF COMMERCE - ENGLISH / GUJARATI MEDIUM)", 
    icon: Briefcase,
    details: "Our B.Com program provides a strong foundation in accounting, finance, and trade. We offer both English and Gujarati medium options to cater to all students.",
    features: ["Financial Accounting", "Direct & Indirect Tax", "Business Economics", "Auditing"]
  },
  { 
    title: "BBA", 
    sub: "(BACHELOR OF BUSINESS ADMINISTRATION)", 
    icon: Award,
    details: "The BBA program is designed to develop next-generation leaders and entrepreneurs. It focuses on practical management skills and corporate internships.",
    features: ["Marketing Management", "Human Resources", "Strategic Planning", "Organizational Behavior"]
  },
  { 
    title: "BCA", 
    sub: "(BACHELOR OF COMPUTER APPLICATIONS)", 
    icon: Code,
    details: "BCA is for tech enthusiasts aiming for software development. Our curriculum covers modern programming, web technologies, and database management.",
    features: ["Java & Python Coding", "Web Development", "Database Systems", "Software Engineering"]
  },
  { 
    title: "M.Com.", 
    sub: "(MASTER OF COMMERCE)", 
    icon: GraduationCap,
    details: "Advanced study for commerce professionals. M.Com focuses on research, advanced taxation, and global business practices.",
    features: ["Advanced Accountancy", "Business Research", "International Trade", "Project Management"]
  },
  { 
    title: "Certificate Courses", 
    sub: "Specialized Professional Training", 
    icon: BookOpen, 
    fullWidth: true,
    details: "Short-term specialized courses to boost employability. We offer training in Tally, Digital Marketing, and Soft Skills.",
    features: ["Computerized Accounting", "Digital Marketing", "Personality Development", "Language Skills"]
  }
]

const CoursesOffered = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <section className="py-20 container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white uppercase tracking-widest">
          Courses <span className="text-primary-600">Offered</span>
        </h2>
        <div className="w-24 h-1 bg-primary-600 mx-auto mt-4 rounded-full opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedCourse(course)}
            className={`glass p-8 rounded-3xl border-2 border-primary-500/10 hover:border-primary-500/30 transition-all flex flex-col items-center text-center group cursor-pointer ${course.fullWidth ? 'md:col-span-2' : ''}`}
          >
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <course.icon className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
            <p className="text-sm text-slate-500 font-medium tracking-tight whitespace-pre-line">
              {course.sub}
            </p>
            <span className="mt-4 text-xs font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Click for details</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass max-w-2xl w-full p-8 md:p-12 rounded-[2.5rem] relative shadow-2xl"
            >
              <button onClick={() => setSelectedCourse(null)} className="absolute top-6 right-6 p-2"><X /></button>
              <div className="flex items-center gap-4 mb-8">
                <selectedCourse.icon className="h-10 w-10 text-primary-600" />
                <h3 className="text-3xl font-bold">{selectedCourse.title}</h3>
              </div>
              <p className="text-slate-500 mb-8 leading-relaxed">{selectedCourse.details}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCourse.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> {f}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CoursesOffered
