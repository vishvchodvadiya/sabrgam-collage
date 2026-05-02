import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Check, X, User, GraduationCap, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([])

  const fetchAdmissions = async () => {
    const { data } = await axios.get('http://localhost:5000/api/admin/admissions')
    setAdmissions(data)
  }

  useEffect(() => {
    fetchAdmissions()
  }, [])

  const handleStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/admissions/${id}`, { status })
      toast.success(`Application ${status}`)
      fetchAdmissions()
    } catch (error) {
      toast.error('Update Failed')
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage <span className="text-primary-600">Admissions</span></h1>

      <div className="space-y-4">
        {admissions.map((adm) => (
          <motion.div 
            key={adm._id}
            layout
            className="glass p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                <User className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{adm.student?.name}</h3>
                <p className="text-sm text-slate-500">{adm.student?.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-center md:items-start">
              <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1">
                <GraduationCap className="h-3 w-3" /> Course
              </span>
              <span className="font-bold">{adm.course?.title}</span>
            </div>

            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <span className="text-xs font-bold uppercase text-slate-400">Education</span>
              <p className="text-sm max-w-xs truncate">{adm.previousEducation}</p>
              <span className="text-xs font-bold text-primary-600">Score: {adm.percentage}%</span>
            </div>

            <div className="flex gap-3">
              {adm.status === 'pending' ? (
                <>
                  <button 
                    onClick={() => handleStatus(adm._id, 'approved')}
                    className="bg-green-100 text-green-600 p-3 rounded-2xl hover:bg-green-600 hover:text-white transition"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleStatus(adm._id, 'rejected')}
                    className="bg-red-100 text-red-600 p-3 rounded-2xl hover:bg-red-600 hover:text-white transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                  adm.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {adm.status}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ManageAdmissions
