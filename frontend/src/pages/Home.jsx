import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Bell, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import CoursesSection from '../components/UI/CoursesSection'
import VideoHero from '../components/UI/VideoHero'

const Home = () => {
  return (
    <div className="space-y-20">
      <VideoHero />
      {/* Hero Section */}
      <section className="relative py-10 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Empowering Your <br />
            <span className="text-primary-600">Future</span> with AI
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg">
            Sabargam College offers a blend of traditional excellence and modern AI-powered learning paths for students globaly.
          </p>
          <div className="flex gap-4">
            <Link to="/admission" className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition shadow-lg shadow-primary-500/30">
              Apply Now <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/courses" className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition">
              View Courses
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src="https://in.images.search.yahoo.com/yhs/view;_ylt=Awr1Qaef3cdpKMgK9BIO9olQ;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzJkMWZkNzE5YzViYTk2ZjhlZmRhM2FiZmUzNGU4OWU4BGdwb3MDMTIEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fyhs%2Fsearch%3Fp%3Dsabargam%2Bcollege%2Bima%26ei%3DUTF-8%26type%3Dtype80160-640941678%26fr%3Dyhs-sz-002%26hsimp%3Dyhs-002%26hspart%3Dsz%26param1%3D2584322279%26tab%3Dorganic%26ri%3D12&w=300&h=225&imgurl=accmibmdica.ac.in%2Fwp-content%2Fuploads%2F2024%2F06%2Fimage_2.jpeg&rurl=https%3A%2F%2Faccmibmdica.ac.in%2Fabout-us%2F&size=12KB&p=sabargam+college+ima&oid=2d1fd719c5ba96f8efda3abfe34e89e8&fr2=&fr=yhs-sz-002&tt=About+Us%3A+Overview+%E2%80%93+Sabargam+College&b=0&ni=140&no=12&ts=&tab=organic&sigr=ULHTOfx5WeW.&sigb=ZhATNWd3E0MR&sigi=4YUI5qv4_ZhC&sigt=ITdUtVpcbx.i&.crumb=4LsVG35sq2p&fr=yhs-sz-002&hsimp=yhs-002&hspart=sz&type=type80160-640941678&param1=2584322279"
              alt="College"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: BookOpen, label: 'Courses', value: '50+' },
          { icon: GraduationCap, label: 'Students', value: '2000+' },
          { icon: Bell, label: 'Success Rate', value: '98%' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-2xl text-center"
          >
            <stat.icon className="h-12 w-12 mx-auto text-primary-600 mb-4" />
            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
            <p className="text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Courses Offered Section */}
      <CoursesSection />
    </div>
  )
}

export default Home
