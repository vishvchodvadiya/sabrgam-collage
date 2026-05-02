import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Bell, Calendar, Info } from 'lucide-react'

const Notices = () => {
  const [notices, setNotices] = useState([])

  useEffect(() => {
    const fetchNotices = async () => {
      const { data } = await axios.get('http://localhost:5000/api/student/notices')
      setNotices(data)
    }
    fetchNotices()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 text-primary-600">
        <Bell className="h-10 w-10" />
        <h1 className="text-4xl font-extrabold">Notices & <span className="text-slate-900 dark:text-white">Announcements</span></h1>
      </div>

      <div className="space-y-4">
        {notices.map((notice, i) => (
          <motion.div 
            key={notice._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl flex gap-6"
          >
            <div className="hidden md:flex flex-col items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl p-4 min-w-[100px]">
              <span className="text-2xl font-bold">{new Date(notice.date).getDate()}</span>
              <span className="text-xs uppercase font-bold">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  notice.type === 'exam' ? 'bg-red-100 text-red-600' : 
                  notice.type === 'holiday' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {notice.type}
                </span>
                <span className="text-xs text-slate-500 md:hidden">{new Date(notice.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-bold">{notice.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{notice.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Notices
