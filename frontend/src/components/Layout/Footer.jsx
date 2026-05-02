import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import logo from '../../assets/logo.png'

const Footer = () => {
  const socialLinks = [
    { Icon: Facebook, href: 'https://www.facebook.com/AmbabaCommerceCollege/' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: 'https://www.instagram.com/ambaba.college/' },
    { Icon: Linkedin, href: 'https://in.linkedin.com/in/ambaba-college-sabargam-23696851' }
  ]

  return (
    <footer className="glass mt-20 pt-16 pb-8 px-6 border-t-0 rounded-t-[3rem]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="SabarGam College Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              SabarGam<span className="text-primary-600">College</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            SabarGam College is dedicated to providing world-class education with a focus on AI integration and modern learning methodologies.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:bg-primary-600 hover:text-white transition">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><Link to="/courses" className="hover:text-primary-600 transition">Our Courses</Link></li>
            <li><Link to="/admission" className="hover:text-primary-600 transition">Admissions 2024</Link></li>
            <li><Link to="/notices" className="hover:text-primary-600 transition">Latest Notices</Link></li>
            <li><Link to="/about" className="hover:text-primary-600 transition">About Us</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><Link to="/contact" className="hover:text-primary-600 transition">Contact Us</Link></li>
            <li><a href="#" className="hover:text-primary-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary-600 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary-600 transition">Student Handbook</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-6">Contact Info</h3>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary-600 shrink-0" />
              <span>
                At: Sabargam,<br />
                Post: Niyol, Ta: Choryasi,<br />
                Dist: Surat - 394325, Gujarat
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary-600 shrink-0" />
              <span>+91 8980004848</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary-600 shrink-0" />
              <span>ambaba.college@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs">
        © 2024 Sabargam College. All rights reserved. Designed with ❤️ for Sabargam students.
      </div>
    </footer>
  )
}

export default Footer
