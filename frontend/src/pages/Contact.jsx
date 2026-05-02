import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/student/contact', formData)
      toast.success('Message sent! We will contact you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) { toast.error('Failed to send message') }
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Header Section */}
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center text-center text-white rounded-[3.5rem] overflow-hidden mx-4 lg:mx-10 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Office Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tight">Contact <span className="text-primary-400">Us</span></h1>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-7xl space-y-16">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: MapPin, 
              label: 'Address', 
              value: (
                <span className="text-center">
                  At: Sabargam,<br />
                  Post: Niyol, Ta: Choryasi,<br />
                  Dist: Surat - 394325, Gujarat
                </span>
              ),
              color: 'text-primary-600',
              bg: 'bg-primary-50 dark:bg-primary-900/20'
            },
            { 
              icon: Phone, 
              label: 'Contact No.', 
              value: '+91 8980004848',
              color: 'text-green-600',
              bg: 'bg-green-50 dark:bg-green-900/20'
            },
            { 
              icon: Mail, 
              label: 'Email', 
              value: 'ambaba.college@gmail.com',
              color: 'text-blue-600',
              bg: 'bg-blue-50 dark:bg-blue-900/20'
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center space-y-4 group hover:scale-[1.02] transition-all"
            >
              <div className={`p-4 ${item.bg} ${item.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest text-sm">{item.label}</h3>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Locate Us */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black flex items-center gap-3">
                Locate <span className="text-primary-600">Us</span>
                <div className="w-12 h-1 bg-primary-600 rounded-full" />
              </h2>
            </div>
            <div className="h-[450px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.23456789!2d72.9!3d21.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEyJzAwLjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1714662600000!5m2!1sen!2sin" 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Write Us */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black flex items-center gap-3">
                Write <span className="text-primary-600">Us</span>
                <div className="w-12 h-1 bg-primary-600 rounded-full" />
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-[3.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <input 
                  type="text" 
                  className="w-full p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-transparent focus:border-primary-600 transition outline-none" 
                  placeholder="Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="email" 
                  className="w-full p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-transparent focus:border-primary-600 transition outline-none" 
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <textarea 
                  className="w-full p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-transparent h-40 focus:border-primary-600 transition outline-none resize-none" 
                  placeholder="Message"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <input type="checkbox" className="w-5 h-5 rounded-lg text-primary-600" required />
                <span className="text-sm font-medium text-slate-500">I'm not a robot</span>
              </div>

              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                SEND MESSAGE <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
