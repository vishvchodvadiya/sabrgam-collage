import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Sparkles, Send, Bell } from 'lucide-react'

const ManageNotices = () => {
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [loadingAi, setLoadingAi] = useState(false)

  const generateWithAi = async () => {
    if (!topic) return toast.error('Enter a topic first')
    setLoadingAi(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/generate-notice', { topic })
      setContent(data.content)
      toast.success('Notice content generated!')
    } catch (error) { toast.error('AI Generation Failed') }
    setLoadingAi(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/admin/notices', { title, content })
      toast.success('Notice Published!')
      setTitle(''); setContent(''); setTopic('')
    } catch (error) { toast.error('Publish Failed') }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Bell className="text-primary-600" /> Manage <span className="text-primary-600">Notices</span>
      </h1>

      <div className="glass p-8 rounded-3xl space-y-6">
        <div className="space-y-4">
          <label className="font-bold text-sm uppercase text-slate-500">AI Notice Generator</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter topic (e.g. Summer Vacation, Exam Schedule)"
              className="flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
            <button 
              onClick={generateWithAi}
              disabled={loadingAi}
              className="bg-indigo-600 text-white px-6 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <Sparkles className="h-5 w-5" /> {loadingAi ? 'GPT thinking...' : 'AI Generate'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <input 
            type="text" 
            placeholder="Notice Title"
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent font-bold text-xl"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea 
            placeholder="Notice Content"
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent h-64"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            Publish Notice <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ManageNotices
