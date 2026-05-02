import React from 'react'
import { motion } from 'framer-motion'
import { History, Award, Users, BookOpen, GraduationCap, Building2 } from 'lucide-react'

const About = () => {
  const institutions = [
    {
      name: "Ambaba Commerce College",
      year: "2004",
      icon: Building2,
      description: "A premier educational institution in the region for nearly two decades, offering programs in both Gujarati and English mediums. It provides students with a solid foundation in core principles of commerce and accounting."
    },
    {
      name: "Maniba Institute of Business Management",
      year: "2006",
      icon: Award,
      description: "Founded to solidify the area's reputation as a hub for quality business education, bringing a reputation for innovative curriculum and commitment to developing the next generation of business leaders."
    },
    {
      name: "Deviba Institute of Computer Application",
      year: "2007",
      icon: Users,
      description: "Established to cater to the growing demand for skilled professionals in the rapidly evolving field of information technology, offering cutting-edge programs that equip students with modern tools."
    }
  ]

  return (
    <div className="space-y-24 pb-20">
      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-center text-white rounded-[3.5rem] overflow-hidden mx-4 lg:mx-10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80&w=2000" 
            alt="Campus Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-slate-900/60 to-slate-950" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4 px-6"
        >
          <h1 className="text-6xl md:text-7xl font-black tracking-tight">About <span className="text-primary-400">Us</span></h1>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full" />
          <p className="text-xl md:text-2xl font-medium opacity-90 max-w-2xl mx-auto">
            A Legacy of Excellence, A Future of Innovation
          </p>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
              <History size={18} /> Our Heritage
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Six Decades of Shaping <br />
              <span className="text-primary-600">Educational Excellence</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                The <strong>Shree Dakshin Gujarat Shikshan Samaj Trust in Kubharia</strong> has a rich and storied history dating back over 60 years. Established in 1959, the trust has played a pivotal role in shaping the educational landscape of the region.
              </p>
              <p>
                Over the decades, the trust has founded a remarkable array of educational establishments, including the esteemed <strong>Ambaba Commerce College</strong>, <strong>Maniba Institute of Business Management</strong>, and <strong>Deviba Institute of Computer Application, Sabargam</strong>.
              </p>
              <p>
                These institutes have cultivated a comprehensive range of academic programs, catering to the diverse interests and aspirations of students. Through its unwavering commitment to student success, the trust has forged an expansive network of career opportunities, empowering graduates to thrive in a rapidly evolving job market.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-4 bg-primary-500/20 blur-3xl rounded-full group-hover:bg-primary-500/30 transition duration-1000" />
            <img 
              src="https://accmibmdica.ac.in/wp-content/uploads/2024/12/DJI_0103.jpg" 
              alt="Campus View" 
              className="relative rounded-[3rem] shadow-2xl z-10 border-8 border-white dark:border-slate-800"
            />
          </motion.div>
        </div>
      </section>

      {/* Institutions Section */}
      <section className="bg-slate-100 dark:bg-slate-950 py-24 rounded-[4rem] mx-4 lg:mx-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black">Our <span className="text-primary-600">Institutions</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto">Building a ecosystem of learning across multiple disciplines since 1959.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {institutions.map((inst, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition hover:scale-[1.02] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center space-y-6"
              >
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-3xl">
                  <inst.icon size={32} />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-black text-primary-500 uppercase tracking-widest">{inst.year}</div>
                  <h3 className="text-2xl font-bold">{inst.name}</h3>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  {inst.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* M.Com Milestone */}
      <section className="container mx-auto px-6 max-w-5xl text-center py-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-br from-slate-900 to-black p-12 md:p-20 rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] rounded-full -mr-20 -mt-20" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-[0.3em] uppercase">
              Recent Milestone
            </div>
            <h3 className="text-4xl md:text-5xl font-black leading-tight">
              M.Com Program <br />
              <span className="text-primary-400">Established in 2020</span>
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              The M.Com program at our Sabargam campus introduced an innovative academic offering to cater to the growing demand for advanced business and financial education. Our curriculum offers deep knowledge of corporate accounting, financial management, taxation, and analytical skills.
            </p>
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: '60+ Years', sub: 'Trust Legacy' },
                { label: '4 Major', sub: 'Programs' },
                { label: '5000+', sub: 'Graduates' },
                { label: 'Top Tier', sub: 'Faculty' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl font-black text-primary-500">{stat.label}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default About
