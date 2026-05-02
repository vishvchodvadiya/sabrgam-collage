import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FileText, Download, Search, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const Materials = () => {
  const [materials, setMaterials] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data } = await axios.get('http://localhost:5000/api/student/materials')
      setMaterials(data)
    }
    fetchMaterials()
  }, [])

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.course?.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold flex items-center gap-3">
            <BookOpen className="text-primary-600" /> Study <span className="text-primary-600">Materials</span>
          </h1>
          <p className="text-slate-500 mt-2">Access your course resources and PDFs</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search materials..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat, i) => (
          <motion.div 
            key={mat._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl flex items-center gap-4 hover:border-primary-500/50 transition-colors cursor-pointer group"
          >
            <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600">
              <FileText className="h-7 w-7" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-bold truncate group-hover:text-primary-600 transition">{mat.title}</h3>
              <p className="text-xs text-slate-500 uppercase font-bold mt-1">{mat.course?.title || 'General'}</p>
            </div>
            <a 
              href={mat.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-primary-600 hover:text-white transition"
            >
              <Download className="h-5 w-5" />
            </a>
          </motion.div>
        ))}
        {filteredMaterials.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            No materials found. Check back later!
          </div>
        )}
      </div>
    </div>
  )
}

export default Materials
