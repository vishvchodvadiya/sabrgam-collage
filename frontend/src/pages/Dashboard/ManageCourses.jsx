import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Plus, Trash2, Edit, X, Save } from 'lucide-react'

const ManageCourses = () => {
  const [courses, setCourses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', duration: '', fee: '', instructor: ''
  })

  const fetchCourses = async () => {
    const { data } = await axios.get('http://localhost:5000/api/student/courses')
    setCourses(data)
  }

  useEffect(() => { fetchCourses() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/admin/courses', formData)
      toast.success('Course Added!')
      setShowModal(false)
      fetchCourses()
    } catch (error) { toast.error('Error adding course') }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5000/api/admin/courses/${id}`)
      toast.success('Course Deleted')
      fetchCourses()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage <span className="text-primary-600">Courses</span></h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-700 transition"
        >
          <Plus className="h-5 w-5" /> Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course._id} className="glass p-6 rounded-3xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-sm text-slate-500">{course.category} • ${course.fee}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(course._id)} className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass w-full max-w-lg p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Add New Course</h2>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-2">
              <input type="text" placeholder="Title" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent" onChange={e => setFormData({...formData, title: e.target.value})} required />
              <input type="text" placeholder="Subtitle (e.g. English Medium)" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent" onChange={e => setFormData({...formData, subtitle: e.target.value})} />
              <textarea placeholder="Description (Short)" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent h-20" onChange={e => setFormData({...formData, description: e.target.value})} required />
              <textarea placeholder="Details (Full Overview)" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent h-32" onChange={e => setFormData({...formData, details: e.target.value})} />
              <input type="text" placeholder="Eligibility" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent" onChange={e => setFormData({...formData, eligibility: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <select className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent" onChange={e => setFormData({...formData, category: e.target.value})} required>
                  <option value="">Select Category</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Computer">Computer</option>
                  <option value="Management">Management</option>
                </select>
                <input type="number" placeholder="Fee ($)" className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent" onChange={e => setFormData({...formData, fee: e.target.value})} required />
              </div>
              <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold">Save Course</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageCourses
