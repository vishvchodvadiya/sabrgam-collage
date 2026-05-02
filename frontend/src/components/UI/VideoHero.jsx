import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

const VideoHero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden rounded-[3rem] mx-auto mb-20 shadow-2xl">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        >
          <source src="https://v1.bg.pixabay.com/video/2016/09/20/5312-183818815_tiny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase border border-white/20">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            Admissions Open 2024-25
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight drop-shadow-2xl">
            SabarGam <span className="text-primary-400">College</span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 font-medium max-w-2xl mx-auto drop-shadow-md">
            Shaping the next generation of innovators with excellence in education and modern AI integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link 
              to="/admission" 
              className="group bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              Start Your Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 active:scale-95">
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/40 transition-colors">
                <Play className="fill-white" size={18} />
              </div>
              Watch Campus Tour
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white/80 to-transparent" />
      </motion.div>
    </section>
  )
}

export default VideoHero
