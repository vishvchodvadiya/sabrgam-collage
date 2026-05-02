import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Users, Bell, MessageSquare, ClipboardCheck, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const AdminSidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Students', path: '/admin/students' },
    { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
    { icon: ClipboardCheck, label: 'Admissions', path: '/admin/admissions' },
    { icon: Bell, label: 'Notices', path: '/admin/notices' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
  ]

  return (
    <div className="w-64 h-[calc(100vh-120px)] glass rounded-3xl p-6 flex flex-col justify-between">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
                : 'hover:bg-primary-50 dark:hover:bg-primary-900/20'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
      
      <button 
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  )
}

export default AdminSidebar
