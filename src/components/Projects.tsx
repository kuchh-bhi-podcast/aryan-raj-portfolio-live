import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Dhruv Travels',
    category: 'Car Rental Web App',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 2,
    title: 'Aawas',
    category: 'Real Estate Android App',
    tech: ['Java', 'Android Studio', 'Supabase', 'SQL'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Selected <span className="text-gradient">Works.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative block w-full interactive cursor-pointer"
            >
              {/* Project Card */}
              <div className="relative w-full rounded-[2rem] overflow-hidden glass-dark border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 transition-all duration-500 hover:border-white/20">
                
                {/* Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Content */}
                <div className="flex-1 z-10">
                  <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
                    {project.category}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="px-4 py-2 rounded-full glass border-white/10 text-sm text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors duration-300">
                    View Project
                    <motion.span
                      animate={{ x: hoveredIndex === idx ? 5 : 0, y: hoveredIndex === idx ? -5 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <ArrowUpRight size={20} />
                    </motion.span>
                  </div>
                </div>

                {/* Image Reveal */}
                <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden relative z-10">
                  <motion.div
                    animate={{ 
                      scale: hoveredIndex === idx ? 1.05 : 1,
                      rotate: hoveredIndex === idx ? 2 : 0
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
