import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GraduationCap, Send } from 'lucide-react'

const Admission = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState({
    courseId: searchParams.get('courseId') || '',
    previousEducation: '',
    percentage: ''
  })

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

  // Update courseId if URL param changes
  useEffect(() => {
    const cid = searchParams.get('courseId')
    if (cid) {
      setFormData(prev => ({ ...prev, courseId: cid }))
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return toast.error('Please login to apply')
    try {
      await axios.post('http://localhost:5000/api/student/admission', formData)
      toast.success('Application Submitted Successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission Failed')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="glass p-8 rounded-3xl space-y-8">
        <div className="flex items-center gap-4 text-primary-600">
          <GraduationCap className="h-10 w-10" />
          <h1 className="text-4xl font-extrabold">Online Admission</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Select Course</label>
              <select 
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary-500 transition"
                value={formData.courseId}
                onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                required
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Percentage %</label>
              <input 
                type="number" 
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent"
                placeholder="e.g. 85"
                value={formData.percentage}
                onChange={(e) => setFormData({...formData, percentage: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Previous Education</label>
            <textarea 
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent h-32"
              placeholder="e.g. Completed High School with Science background..."
              value={formData.previousEducation}
              onChange={(e) => setFormData({...formData, previousEducation: e.target.value})}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg shadow-primary-500/25"
          >
            Submit Application <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Admission
