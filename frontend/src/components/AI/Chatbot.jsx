import React, { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am the Sabargam AI assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/chat', { message: input })
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having some trouble right now.' }])
    }
    setLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass mb-4 w-80 md:w-96 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-primary-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <span className="font-bold">Sabargam AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-none' 
                      : 'glass dark:bg-slate-800 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask anything..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 text-sm outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="bg-primary-600 text-white p-2 rounded-xl">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 text-white p-4 rounded-2xl shadow-xl shadow-primary-500/40"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  )
}

export default Chatbot
