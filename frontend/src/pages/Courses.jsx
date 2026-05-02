import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Search, Sparkles, BookOpen, Clock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Courses = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [loadingAi, setLoadingAi] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get('http://localhost:5000/api/student/courses')
      setCourses(data)
    }
    fetchCourses()
  }, [])

  const getAiRecommendation = async () => {
    setLoadingAi(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/recommend')
      setRecommendation(data.recommendation)
    } catch (error) {
      console.error(error)
    }
    setLoadingAi(false)
  }

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-4xl font-extrabold">Explore <span className="text-primary-600">Courses</span></h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search for courses..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {user && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-primary-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6" />
            <h2 className="text-2xl font-bold">AI Course Recommendation</h2>
          </div>
          {recommendation ? (
            <p className="text-lg opacity-90 leading-relaxed">{recommendation}</p>
          ) : (
            <button 
              onClick={getAiRecommendation}
              disabled={loadingAi}
              className="bg-white text-primary-600 px-6 py-2 rounded-xl font-bold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {loadingAi ? 'Thinking...' : 'Get Personalized Recommendation'}
            </button>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <motion.div 
            key={course._id}
            whileHover={{ y: -10 }}
            className="glass rounded-3xl overflow-hidden group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={course.thumbnail || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800"} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 uppercase">
                {course.category}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold truncate">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</div>
                <div className="flex items-center gap-1"><User className="h-4 w-4" /> {course.instructor}</div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm">
                {course.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-2xl font-bold text-primary-600">${course.fee}</span>
                <Link to={`/admission?courseId=${course._id}`} className="text-primary-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Enroll Now <BookOpen className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Courses
