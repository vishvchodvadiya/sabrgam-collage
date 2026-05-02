import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import { UserPlus } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    interests: ''
  })
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const interestsArray = formData.interests.split(',').map(i => i.trim())
      await register({ ...formData, interests: interestsArray })
      toast.success('Registration Successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="glass p-8 rounded-2xl space-y-6">
        <div className="text-center space-y-2">
          <UserPlus className="h-12 w-12 mx-auto text-primary-600" />
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-slate-500 text-lg">Join the Sabargam community</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Interests (Comma separated)</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
              placeholder="Coding, Design, Music"
              value={formData.interests}
              onChange={(e) => setFormData({...formData, interests: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition">
            Register
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
