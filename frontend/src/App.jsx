import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

// Layout Components
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import GallerySlider from './components/UI/GallerySlider'
import Chatbot from './components/AI/Chatbot'
import AdminSidebar from './components/Layout/AdminSidebar'

// Pages
import Home from './pages/Home'
import Courses from './pages/Courses'
import Notices from './pages/Notices'
import About from './pages/About'
import Contact from './pages/Contact'
import Admission from './pages/Admission'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Dashboard
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import ManageCourses from './pages/Dashboard/ManageCourses'
import ManageNotices from './pages/Dashboard/ManageNotices'
import ManageAdmissions from './pages/Dashboard/ManageAdmissions'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/login" />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />
  
  return children
}

const AdminLayout = ({ children }) => {
  return (
    <div className="flex gap-8">
      <AdminSidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <Toaster position="top-center" />
          <Navbar />
          <main className="container mx-auto px-6 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><AdminDashboard /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/courses" element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><ManageCourses /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/notices" element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><ManageNotices /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/admissions" element={
                <ProtectedRoute adminOnly>
                  <AdminLayout><ManageAdmissions /></AdminLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <GallerySlider />
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
