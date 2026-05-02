import React from 'react'
import { motion } from 'framer-motion'

const images = [
  "https://accmibmdica.ac.in/wp-content/uploads/2024/12/DJI_0103.jpg",
  "https://images.bhaskarassets.com/thumb/730x0/web2images/960/2025/03/01/EC681DC7-BF2F-40FB-A370-301E53FDA290_1740830112828.jpg",
  "https://accmibmdica.ac.in/wp-content/uploads/2024/09/2024_08_15_08_44_IMG_1207_3_11zon.jpg",
  "https://accmibmdica.ac.in/wp-content/uploads/2024/12/IMG_7183.jpg",
  "https://accmibmdica.ac.in/wp-content/uploads/2024/12/FST_7765.jpg",
  "https://accmibmdica.ac.in/wp-content/uploads/2024/09/2024_08_15_08_40_IMG_1205_2_11zon-scaled.jpg"
]

const campusInfo = [
  { src: "https://accmibmdica.ac.in/wp-content/uploads/2024/12/DJI_0103.jpg", label: "Modern Campus Infrastructure" },
  { src: "https://images.bhaskarassets.com/thumb/730x0/web2images/960/2025/03/01/EC681DC7-BF2F-40FB-A370-301E53FDA290_1740830112828.jpg", label: "Excellence in Education" },
  { src: "https://accmibmdica.ac.in/wp-content/uploads/2024/09/2024_08_15_08_44_IMG_1207_3_11zon.jpg", label: "Advanced Computer Application Labs" },
  { src: "https://accmibmdica.ac.in/wp-content/uploads/2024/12/IMG_7183.jpg", label: "Business & Management Programs" },
  { src: "https://accmibmdica.ac.in/wp-content/uploads/2024/12/FST_7765.jpg", label: "Vibrant Student Community" },
  { src: "https://accmibmdica.ac.in/wp-content/uploads/2024/09/2024_08_15_08_40_IMG_1205_2_11zon-scaled.jpg", label: "Holistic Learning Environment" }
]

const GallerySlider = () => {
  // Duplicate for seamless loop
  const duplicatedItems = [...campusInfo, ...campusInfo]

  return (
    <section className="py-12 overflow-hidden bg-slate-100/50 dark:bg-slate-900/20 rounded-[3rem] mx-4 lg:mx-10 mb-[-1.5rem] relative z-10">
      <div className="container mx-auto px-6 mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold">Campus <span className="text-primary-600">Life</span></h2>
        <p className="text-slate-500 mt-2">Glimpses of our vibrant college environment and academic excellence</p>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -2800] }} // Adjusted for 6 items width
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {duplicatedItems.map((item, i) => (
            <div 
              key={i}
              className="relative min-w-[300px] md:min-w-[450px] aspect-video rounded-3xl overflow-hidden shadow-xl"
            >
              <img 
                src={item.src} 
                alt={item.label} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-lg md:text-xl whitespace-normal">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default GallerySlider
