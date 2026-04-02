import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import MagneticButton from './MagneticButton';

const roles = ['Software Developer', 'Builder', 'Creator'];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-glow/20 rounded-full blur-[120px] pointer-events-none gpu-accelerate" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-secondary-glow/20 rounded-full blur-[100px] pointer-events-none gpu-accelerate" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          style={{ y: y1, opacity }}
          className="flex flex-col items-start z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 text-xs font-medium tracking-wider uppercase text-gray-300"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-6"
          >
            Aryan <br />
            <span className="text-gradient">Raj.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-12 overflow-hidden mb-8"
          >
            <motion.div
              animate={{ y: `-${currentRole * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="flex flex-col"
            >
              {roles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-2xl md:text-3xl font-light text-gray-400 h-12 flex items-center"
                >
                  {role}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex gap-4"
          >
            <MagneticButton
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              className="bg-transparent border border-white/20 text-white hover:bg-white/5"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Image Integration with Depth */}
        <motion.div
          style={{ y: y2 }}
          className="relative h-[400px] md:h-[600px] w-full max-w-[500px] mx-auto lg:ml-auto perspective-1000"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative group transform-style-3d interactive"
          >
            {/* Background Blur Layer */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent/20 to-secondary/20 blur-2xl transform -translate-z-10 group-hover:blur-3xl transition-all duration-700" />
            
            {/* Main Image Container */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden glass-dark border-white/10 shadow-2xl">
              <img
                src="https://files.catbox.moe/zre3uq.jpeg"
                alt="Aryan Raj"
                className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Cinematic Lighting Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent mix-blend-overlay" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
