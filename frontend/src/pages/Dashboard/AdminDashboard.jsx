import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Users, BookOpen, ClipboardCheck, MessageSquare } from 'lucide-react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    admissions: 0,
    messages: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resUsers, resCourses, resAdmissions, resMessages] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/students'),
          axios.get('http://localhost:5000/api/student/courses'),
          axios.get('http://localhost:5000/api/admin/admissions'),
          axios.get('http://localhost:5000/api/admin/messages')
        ])
        setStats({
          students: resUsers.data.length,
          courses: resCourses.data.length,
          admissions: resAdmissions.data.length,
          messages: resMessages.data.length
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Students', value: stats.students, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Courses', value: stats.courses, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Pending Admissions', value: stats.admissions, icon: ClipboardCheck, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'New Messages', value: stats.messages, icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-100' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard <span className="text-slate-500 font-normal text-xl">Overview</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl"
          >
            <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center mb-4`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{card.label}</p>
            <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl h-64 flex items-center justify-center text-slate-400">
          Chart Placeholder (Student Growth)
        </div>
        <div className="glass p-8 rounded-3xl h-64 flex items-center justify-center text-slate-400">
          Chart Placeholder (Admission Trends)
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
