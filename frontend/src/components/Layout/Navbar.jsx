import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Menu, X, User } from 'lucide-react'
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="glass sticky top-0 z-50 w-full px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="SabarGam College Logo" className="h-12 w-auto rounded-lg" />
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            SabarGam<span className="text-primary-600">College</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <Link to="/courses" className="hover:text-primary-600 transition-colors">Courses</Link>
          <Link to="/notices" className="hover:text-primary-600 transition-colors">Notices</Link>
          <Link to="/about" className="hover:text-primary-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link>
          <Link to="/admission" className="hover:text-primary-600 transition-colors text-primary-600 font-semibold">Admission</Link>
          <Link to="/login" className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
            <User className="h-4 w-4" />
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 p-6 flex flex-col gap-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/courses" onClick={() => setIsOpen(false)}>Courses</Link>
          <Link to="/notices" onClick={() => setIsOpen(false)}>Notices</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/admission" onClick={() => setIsOpen(false)}>Admission</Link>
          <Link to="/login" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
