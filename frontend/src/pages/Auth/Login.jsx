import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import { LogIn } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      toast.success('Login Successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="glass p-8 rounded-2xl space-y-6">
        <div className="text-center space-y-2">
          <LogIn className="h-12 w-12 mx-auto text-primary-600" />
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-slate-500 text-lg">Sign in to your Sabargam account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">
          Don't have an account? <Link to="/register" className="text-primary-600 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
